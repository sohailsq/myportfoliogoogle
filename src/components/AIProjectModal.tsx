import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  Send,
  Loader2,
  Cpu,
  BookOpen,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { IProject } from '../types';
import { api } from '../services/api';

interface AIProjectModalProps {
  project: IProject | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenCaseStudy?: (project: IProject) => void;
}

export const AIProjectModal: React.FC<AIProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  onOpenCaseStudy,
}) => {
  const [activeTab, setActiveTab] = useState<'qa' | 'audit'>('qa');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditData, setAuditData] = useState<string | null>(null);
  const [chatLog, setChatLog] = useState<
    Array<{
      sender: 'user' | 'ai';
      text: string;
      sources?: Array<{ title: string; url: string }>;
    }>
  >([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset or prepopulate when project changes
  useEffect(() => {
    if (project) {
      setQuestion('');
      setErrorMsg(null);
      setAuditData(null);
      setChatLog([
        {
          sender: 'ai',
          text: `Hello! I'm Gemini 3.8 Flash, configured with Google Search grounding for Sohail Shah's **${project.title}**. Ask me anything about its system architecture, state management trade-offs, real-time mechanics, or how Sohail built it.`,
        },
      ]);
    }
  }, [project]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog, loading]);

  const quickPrompts = project
    ? [
        `Explain the architectural trade-offs in ${project.title}`,
        `Why did Sohail choose ${project.technologies.slice(0, 3).join(', ')}?`,
        `How was latency and UI performance optimized here?`,
        `Ask me a Senior Interview Question based on this architecture`,
      ]
    : [];

  const handleSendQuestion = async (customPrompt?: string) => {
    const q = (customPrompt || question).trim();
    if (!q || !project || loading) return;

    setErrorMsg(null);
    setQuestion('');
    setChatLog((prev) => [...prev, { sender: 'user', text: q }]);
    setLoading(true);

    try {
      const res = await api.askProjectQuestion(project.id, q, project);
      setChatLog((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: res.answer,
          sources: res.sources,
        },
      ]);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to generate response. Please try again.');
      setChatLog((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `⚠️ **AI Response Note**: ${
            err.message ||
            'Could not reach the Gemini service. Please verify server connection and API key.'
          }`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAudit = async () => {
    if (!project || auditLoading) return;
    setAuditLoading(true);
    setErrorMsg(null);
    try {
      const res = await api.getProjectAudit(project.id);
      setAuditData(res.audit);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to generate project audit.');
    } finally {
      setAuditLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'audit' && !auditData && !auditLoading && project) {
      handleGenerateAudit();
    }
  }, [activeTab, project]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#0e131f] border border-slate-800/90 rounded-2xl shadow-2xl p-5 sm:p-7 my-6 text-slate-100 transition-all max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/25 text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-0.5">
                <span className="text-amber-400 font-semibold">{project.title}</span>
                <span>·</span>
                <span className="text-slate-400">Gemini 3.8 Flash</span>
                <span>·</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-800/80 text-[10px] text-emerald-400 border border-emerald-500/25 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3 h-3" /> Grounded with Google Search
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-slate-100">
                AI Architecture &amp; Engineering Explorer
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer border border-slate-800/60"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-4 pb-2 border-b border-slate-800/60">
          <button
            onClick={() => setActiveTab('qa')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'qa'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Interactive Q&amp;A</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Staff Engineer Architectural Audit</span>
          </button>

          {onOpenCaseStudy && (
            <button
              onClick={() => {
                onClose();
                onOpenCaseStudy(project);
              }}
              className="ml-auto inline-flex items-center gap-1 text-xs text-slate-400 hover:text-amber-400 transition-colors font-mono"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Full Case Study</span>
            </button>
          )}
        </div>

        {/* Content Body */}
        {activeTab === 'qa' ? (
          <div className="flex-1 flex flex-col min-h-0 pt-3">
            {/* Quick Prompts Bar */}
            <div className="mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1.5">
                Suggested Technical Questions
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((p, i) => (
                  <button
                    key={i}
                    disabled={loading}
                    onClick={() => handleSendQuestion(p)}
                    className="text-[11px] font-sans text-slate-300 hover:text-amber-300 bg-slate-900/90 hover:bg-slate-850 px-2.5 py-1 rounded-md border border-slate-800 hover:border-amber-400/40 transition-all text-left disabled:opacity-50 cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat History Box */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 min-h-[220px] max-h-[380px] p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              {chatLog.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      {msg.sender === 'user' ? 'You' : 'Gemini 3.8 Flash'}
                    </span>
                  </div>
                  <div
                    className={`max-w-[88%] rounded-xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-amber-400 text-slate-950 font-medium'
                        : 'bg-slate-900/90 text-slate-200 border border-slate-800'
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans">{msg.text}</div>

                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                        <span className="font-mono text-amber-400/80 block mb-1">
                          Verified References:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {msg.sources.map((src, sIdx) => (
                            <a
                              key={sIdx}
                              href={src.url}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex items-center gap-1 text-slate-300 hover:text-amber-300 hover:underline"
                            >
                              <ExternalLink className="w-3 h-3 text-slate-500" />
                              <span>{src.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 p-3 text-xs text-amber-400 bg-amber-400/5 rounded-lg border border-amber-400/20 animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Gemini 3.8 Flash is analyzing the system architecture...</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Question Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendQuestion();
              }}
              className="mt-3 flex items-center gap-2"
            >
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={`Ask any architectural or engineering question about ${project.title}...`}
                disabled={loading}
                className="flex-1 bg-slate-900/90 border border-slate-800 focus:border-amber-400/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!question.trim() || loading}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
              >
                <span>Ask AI</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pt-4 min-h-[300px] max-h-[460px] pr-1">
            {auditLoading ? (
              <div className="py-16 text-center space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-amber-400 mx-auto" />
                <p className="text-sm text-slate-300 font-display">
                  Generating Staff Engineering Audit with Gemini 3.8 Flash...
                </p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto font-mono">
                  Evaluating architecture topology, scalability limits, and interview design challenges.
                </p>
              </div>
            ) : auditData ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Audit generated for {project.title}</span>
                  </div>
                  <button
                    onClick={handleGenerateAudit}
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors font-mono cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Regenerate</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                  {auditData}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-xs text-slate-400 mb-3">No audit generated yet.</p>
                <button
                  onClick={handleGenerateAudit}
                  className="px-4 py-2 text-xs font-semibold bg-amber-400 text-slate-950 rounded-lg hover:bg-amber-300 transition-colors"
                >
                  Generate Audit Now
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Server-side Gemini 3.8 Flash</span>
          </div>
          <span>Engineering Knowledge Base · Sohail Shah</span>
        </div>
      </div>
    </div>
  );
};
