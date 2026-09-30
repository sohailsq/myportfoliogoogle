import React, { useState, useEffect } from 'react';
import { X, Lock, LogOut, Plus, Trash2, Check, RefreshCw, Mail, Layers, Briefcase, Cpu, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { IProject, IExperience, ISkill, IContact } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged?: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onDataChanged }) => {
  const { user, isAdmin, login, logout } = useAuth();
  const [email, setEmail] = useState('admin@sohailshah.dev');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<'messages' | 'projects' | 'experience' | 'skills'>('messages');

  // Data states
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  // Form modals for adding
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    subtitle: '',
    category: 'Full-Stack' as const,
    description: '',
    problem: '',
    solution: '',
    contribution: '',
    technologies: 'React, Node.js, Express, MongoDB',
    githubUrl: 'https://github.com/mohammadsohailshahquadri14',
    liveUrl: '',
    featured: true,
  });

  const loadAdminData = async () => {
    if (!isAdmin) return;
    setLoadingData(true);
    try {
      const [c, p, e, s] = await Promise.all([
        api.getContacts(),
        api.getProjects(),
        api.getExperience(),
        api.getSkills(),
      ]);
      setContacts(c);
      setProjects(p);
      setExperiences(e);
      setSkills(s);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAdmin) {
      loadAdminData();
    }
  }, [isOpen, isAdmin]);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setLoginError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleContactStatus = async (id: string, status: 'unread' | 'read' | 'replied') => {
    try {
      await api.updateContactStatus(id, status);
      setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact message?')) return;
    try {
      await api.deleteContact(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (onDataChanged) onDataChanged();
      setActionMessage('Project deleted successfully.');
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetProjects = async () => {
    if (!confirm('Reset all projects to Sohail’s verified showcase seeds?')) return;
    try {
      const reset = await api.resetProjects();
      setProjects(reset);
      if (onDataChanged) onDataChanged();
      setActionMessage('Projects restored to verified seed data.');
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await api.createProject({
        ...newProject,
        technologies: newProject.technologies.split(',').map((t) => t.trim()),
        image: '/images/hero_developer_workspace_1790605403219.jpg',
        order: projects.length + 1,
      });
      setProjects((prev) => [created, ...prev]);
      setShowAddProject(false);
      if (onDataChanged) onDataChanged();
      setActionMessage('New project added to portfolio database.');
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err: any) {
      setActionMessage(err.message || 'Failed to create project');
      setTimeout(() => setActionMessage(''), 4000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0e131f] border border-slate-800/90 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-slate-100 transition-all max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-display text-slate-100">
                Portfolio Administration Portal
              </h2>
              <p className="text-xs text-slate-400 font-sans">
                Manage MongoDB data, inbound contact submissions, and portfolio projects
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-950/20 border border-rose-800/40 rounded-lg transition-colors cursor-pointer"
                title="Log out from admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close admin modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* If NOT logged in: Show Login Screen */}
        {!isAdmin ? (
          <div className="py-8 max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-100 font-display">
                Administrator Authentication
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-sans">
                Enter your credentials to access the project management backend and contact messages.
              </p>
            </div>

            {loginError && (
              <div className="mb-4 p-3 rounded-lg bg-rose-950/30 border border-rose-800/50 text-rose-400 text-xs">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4 font-sans">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg focus:border-amber-400 focus:outline-none text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg focus:border-amber-400 focus:outline-none text-slate-100"
                />
              </div>

              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-xs">
                <span className="text-slate-400 block font-medium mb-1 font-mono text-[11px]">Verified Demo Credentials:</span>
                <div className="font-mono text-xs text-amber-400">
                  admin@sohailshah.dev / admin123
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-semibold rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
              >
                {loginLoading ? 'Authenticating with JWT...' : 'Authenticate & Open Dashboard'}
              </button>
            </form>
          </div>
        ) : (
          /* When LOGGED IN: Full CRUD Admin Dashboard */
          <div className="mt-6 space-y-6">
            {/* Status bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Authenticated as {user?.email}
                </span>
                <span className="text-slate-600">·</span>
                <span className="flex items-center gap-1 text-slate-400 font-mono">
                  <Database className="w-3.5 h-3.5 text-amber-400" />
                  Live REST API / Database
                </span>
              </div>

              {actionMessage && (
                <span className="text-amber-400 font-medium font-mono text-xs">{actionMessage}</span>
              )}
            </div>

            {/* Navigation tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('messages')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'messages'
                    ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Inbound Inquiries ({contacts.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'projects'
                    ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Projects ({projects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('experience')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'experience'
                    ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Experience ({experiences.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'skills'
                    ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Skills ({skills.length})</span>
              </button>
            </div>

            {/* TAB: Inbound Messages */}
            {activeTab === 'messages' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Messages submitted through contact form:</span>
                  <button onClick={loadAdminData} className="hover:text-amber-400 flex items-center gap-1 font-mono">
                    <RefreshCw className="w-3 h-3" /> Refresh
                  </button>
                </div>

                {contacts.length === 0 ? (
                  <div className="py-12 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-lg">
                    No contact inquiries yet.
                  </div>
                ) : (
                  contacts.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 text-xs space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-200">{c.name}</span>
                            <span className="text-slate-500">&lt;{c.email}&gt;</span>
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-mono ${
                                c.status === 'unread'
                                  ? 'bg-amber-400/10 text-amber-400'
                                  : c.status === 'read'
                                  ? 'bg-blue-400/10 text-blue-400'
                                  : 'bg-emerald-400/10 text-emerald-400'
                              }`}
                            >
                              {c.status}
                            </span>
                          </div>
                          <span className="font-medium text-slate-300 block mt-1">
                            {c.subject}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={c.status}
                            onChange={(e) => handleContactStatus(c.id, e.target.value as any)}
                            className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] text-slate-300"
                          >
                            <option value="unread">Unread</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                          </select>
                          <a
                            href={`mailto:${c.email}?subject=Re: ${encodeURIComponent(c.subject)}`}
                            className="p-1 text-slate-400 hover:text-amber-400"
                            title="Reply via email"
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => handleDeleteContact(c.id)}
                            className="p-1 text-slate-500 hover:text-rose-400 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-slate-300 bg-slate-900/60 p-2.5 rounded border border-slate-800/80 leading-relaxed font-sans">
                        {c.message}
                      </p>

                      <span className="text-[10px] text-slate-500 block font-mono">
                        Received on {new Date(c.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB: Projects */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Current portfolio projects:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleResetProjects}
                      className="px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 border border-slate-800 rounded-lg hover:bg-slate-800 font-mono cursor-pointer"
                    >
                      Reset Seeds
                    </button>
                    <button
                      onClick={() => setShowAddProject(!showAddProject)}
                      className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{showAddProject ? 'Cancel' : 'Add Project'}</span>
                    </button>
                  </div>
                </div>

                {showAddProject && (
                  <form onSubmit={handleCreateProject} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3 text-xs font-sans">
                    <h4 className="font-semibold text-slate-200 font-display">Create New Project</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-400 mb-1">Title</label>
                        <input
                          type="text"
                          required
                          value={newProject.title}
                          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-slate-100"
                          placeholder="e.g. CloudScale Analytics"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Subtitle</label>
                        <input
                          type="text"
                          required
                          value={newProject.subtitle}
                          onChange={(e) => setNewProject({ ...newProject, subtitle: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-slate-100"
                          placeholder="e.g. Real-Time Telemetry Dashboard"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Category</label>
                        <select
                          value={newProject.category}
                          onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-slate-100"
                        >
                          <option value="Full-Stack">Full-Stack</option>
                          <option value="Mobile">Mobile</option>
                          <option value="Fintech">Fintech</option>
                          <option value="AI/ML">AI/ML</option>
                          <option value="Cloud">Cloud</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Technologies (comma separated)</label>
                        <input
                          type="text"
                          value={newProject.technologies}
                          onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-slate-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Description</label>
                      <textarea
                        required
                        rows={2}
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-slate-100"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-400 mb-1">Problem Solved</label>
                        <textarea
                          required
                          rows={2}
                          value={newProject.problem}
                          onChange={(e) => setNewProject({ ...newProject, problem: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Architectural Solution</label>
                        <textarea
                          required
                          rows={2}
                          value={newProject.solution}
                          onChange={(e) => setNewProject({ ...newProject, solution: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-slate-100"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-lg cursor-pointer"
                    >
                      Save to Database
                    </button>
                  </form>
                )}

                <div className="space-y-2">
                  {projects.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-200">{p.title}</span>
                          <span className="text-slate-500 font-mono text-[11px]">({p.category})</span>
                          {p.featured && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-400/10 text-amber-400 border border-amber-400/20">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400 line-clamp-1 mt-0.5">
                          {p.subtitle}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 rounded hover:bg-slate-800 cursor-pointer"
                          title="Delete project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Experience */}
            {activeTab === 'experience' && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400">Career timeline entries:</span>
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-200">{exp.position}</span>
                        <span className="text-amber-400 font-medium">@ {exp.company}</span>
                      </div>
                      <span className="text-slate-400 text-[11px] font-mono">{exp.period} · {exp.location}</span>
                    </div>
                    <span className="text-slate-500 font-mono text-[11px]">{exp.type}</span>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: Skills */}
            {activeTab === 'skills' && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400">Technical competency catalog:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {skills.map((s) => (
                    <div
                      key={s.id}
                      className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs flex items-center justify-between"
                    >
                      <div>
                        <span className="font-medium text-slate-200">{s.name}</span>
                        <span className="text-[10px] text-slate-500 block font-mono">{s.category}</span>
                      </div>
                      <span className="text-[10px] font-mono text-amber-400">{s.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
