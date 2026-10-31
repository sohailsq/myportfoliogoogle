import type { IProject, IExperience, ISkill, IContact, IGithubStats, IUser } from '../types';
import { initialProjects, initialExperience, initialSkills } from '../data/portfolioData';

const STORAGE_KEYS = {
  projects: 'sohail_portfolio_projects',
  experience: 'sohail_portfolio_experience',
  skills: 'sohail_portfolio_skills',
  contacts: 'sohail_portfolio_contacts',
  token: 'sohail_auth_token',
} as const;

export const PORTFOLIO_DATA_CHANGE_EVENT = 'portfolio-data-change';

const adminUser: IUser = {
  id: 'user-admin-local',
  name: 'Sohail Shah',
  email: 'admin@sohailshah.dev',
  role: 'admin',
};

function readCollection<T>(key: string, defaults: T[]): T[] {
  const stored = localStorage.getItem(key);
  if (stored === null) {
    const initial = structuredClone(defaults);
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }

  const parsed: unknown = JSON.parse(stored);
  if (!Array.isArray(parsed)) {
    throw new Error(`Saved portfolio data for "${key}" is invalid. Clear this site's local storage to restore defaults.`);
  }
  const savedItems = parsed as T[];
  if (key === STORAGE_KEYS.projects) {
    const savedSlugs = new Set(savedItems.map((item) => (item as { slug?: string }).slug));
    const newDefaults = defaults.filter((item) => !savedSlugs.has((item as { slug?: string }).slug));
    const migratedItems = savedItems.map((item) => {
      const project = item as IProject;
      return project.githubUrl?.includes('github.com/mohammadsohailshahquadri14')
        ? { ...project, githubUrl: 'https://github.com/sohailsq' } as T
        : item;
    });
    return [...newDefaults, ...migratedItems];
  }
  if (key === STORAGE_KEYS.skills) {
    const savedIds = new Set(savedItems.map((item) => (item as { id?: string }).id));
    const newSkills = defaults.filter((item) => !savedIds.has((item as { id?: string }).id));
    return [...savedItems, ...newSkills];
  }
  return savedItems;
}

function writeCollection<T>(key: string, values: T[]): T[] {
  localStorage.setItem(key, JSON.stringify(values));
  window.dispatchEvent(new CustomEvent(PORTFOLIO_DATA_CHANGE_EVENT, { detail: key }));
  return values;
}

function newId(prefix: string): string {
  return `${prefix}-${globalThis.crypto?.randomUUID?.() ?? Date.now().toString(36)}`;
}

function sortByOrder<T extends { order: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.order - b.order);
}

const githubLanguageColors: Record<string, string> = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', HTML: '#e34c26', CSS: '#563d7c',
  Python: '#3572A5', Dart: '#00B4AB', Java: '#b07219', Go: '#00ADD8',
};

export const api = {
  async getProjects(category?: string): Promise<IProject[]> {
    const projects = sortByOrder(readCollection(STORAGE_KEYS.projects, initialProjects));
    return category && category !== 'All'
      ? projects.filter((project) => project.category.toLowerCase() === category.toLowerCase())
      : projects;
  },

  async getProject(slug: string): Promise<IProject> {
    const project = readCollection(STORAGE_KEYS.projects, initialProjects).find(
      (item) => item.slug === slug || item.id === slug,
    );
    if (!project) throw new Error('Project not found.');
    return project;
  },

  async createProject(data: Partial<IProject>): Promise<IProject> {
    if (!data.title?.trim() || !data.description?.trim()) {
      throw new Error('Project title and description are required.');
    }
    const projects = readCollection(STORAGE_KEYS.projects, initialProjects);
    const project: IProject = {
      id: newId('proj'),
      title: data.title.trim(),
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      subtitle: data.subtitle || 'Modern Software Engineering Project',
      category: data.category || 'Full-Stack',
      description: data.description,
      problem: data.problem || 'Project challenge details to be added.',
      solution: data.solution || 'Project solution details to be added.',
      contribution: data.contribution || 'Full architecture and implementation',
      technologies: data.technologies || ['React', 'Node.js'],
      image: data.image || '/images/hero_developer_workspace_1790605403219.jpg',
      githubUrl: data.githubUrl || 'https://github.com/sohailsq',
      liveUrl: data.liveUrl || '',
      secondaryLiveUrl: data.secondaryLiveUrl,
      featured: data.featured ?? true,
      order: data.order ?? projects.length + 1,
      caseStudy: data.caseStudy || {
        architecture: 'Project architecture details to be added.',
        challenges: [],
        metrics: [],
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    writeCollection(STORAGE_KEYS.projects, [...projects, project]);
    return project;
  },

  async updateProject(id: string, data: Partial<IProject>): Promise<IProject> {
    const projects = readCollection(STORAGE_KEYS.projects, initialProjects);
    const index = projects.findIndex((project) => project.id === id);
    if (index < 0) throw new Error('Project not found.');
    projects[index] = { ...projects[index], ...data, updatedAt: new Date().toISOString() };
    writeCollection(STORAGE_KEYS.projects, projects);
    return projects[index];
  },

  async deleteProject(id: string): Promise<void> {
    const projects = readCollection(STORAGE_KEYS.projects, initialProjects);
    writeCollection(STORAGE_KEYS.projects, projects.filter((project) => project.id !== id));
  },

  async resetProjects(): Promise<IProject[]> {
    return writeCollection(STORAGE_KEYS.projects, structuredClone(initialProjects));
  },

  async getExperience(): Promise<IExperience[]> {
    return sortByOrder(readCollection(STORAGE_KEYS.experience, initialExperience));
  },

  async createExperience(data: Partial<IExperience>): Promise<IExperience> {
    if (!data.company?.trim() || !data.position?.trim()) {
      throw new Error('Experience company and position are required.');
    }
    const experiences = readCollection(STORAGE_KEYS.experience, initialExperience);
    const experience: IExperience = {
      id: newId('exp'),
      company: data.company,
      position: data.position,
      location: data.location || '',
      period: data.period || '',
      startDate: data.startDate || new Date().toISOString().slice(0, 10),
      endDate: data.endDate,
      isCurrent: data.isCurrent,
      type: data.type || 'Full-time',
      description: data.description || [],
      technologies: data.technologies || [],
      highlights: data.highlights || [],
      order: data.order ?? experiences.length + 1,
    };
    writeCollection(STORAGE_KEYS.experience, [...experiences, experience]);
    return experience;
  },

  async updateExperience(id: string, data: Partial<IExperience>): Promise<IExperience> {
    const experiences = readCollection(STORAGE_KEYS.experience, initialExperience);
    const index = experiences.findIndex((experience) => experience.id === id);
    if (index < 0) throw new Error('Experience not found.');
    experiences[index] = { ...experiences[index], ...data };
    writeCollection(STORAGE_KEYS.experience, experiences);
    return experiences[index];
  },

  async deleteExperience(id: string): Promise<void> {
    const experiences = readCollection(STORAGE_KEYS.experience, initialExperience);
    writeCollection(STORAGE_KEYS.experience, experiences.filter((experience) => experience.id !== id));
  },

  async getSkills(category?: string): Promise<ISkill[]> {
    const skills = sortByOrder(readCollection(STORAGE_KEYS.skills, initialSkills));
    return category && category !== 'All'
      ? skills.filter((skill) => skill.category.toLowerCase() === category.toLowerCase())
      : skills;
  },

  async createSkill(data: Partial<ISkill>): Promise<ISkill> {
    if (!data.name?.trim() || !data.category) throw new Error('Skill name and category are required.');
    const skills = readCollection(STORAGE_KEYS.skills, initialSkills);
    const skill: ISkill = {
      id: newId('skill'),
      name: data.name,
      category: data.category,
      proficiency: data.proficiency || 'Advanced',
      yearsOfExperience: data.yearsOfExperience ?? 2,
      highlight: data.highlight || '',
      order: data.order ?? skills.length + 1,
    };
    writeCollection(STORAGE_KEYS.skills, [...skills, skill]);
    return skill;
  },

  async updateSkill(id: string, data: Partial<ISkill>): Promise<ISkill> {
    const skills = readCollection(STORAGE_KEYS.skills, initialSkills);
    const index = skills.findIndex((skill) => skill.id === id);
    if (index < 0) throw new Error('Skill not found.');
    skills[index] = { ...skills[index], ...data };
    writeCollection(STORAGE_KEYS.skills, skills);
    return skills[index];
  },

  async deleteSkill(id: string): Promise<void> {
    const skills = readCollection(STORAGE_KEYS.skills, initialSkills);
    writeCollection(STORAGE_KEYS.skills, skills.filter((skill) => skill.id !== id));
  },

  async submitContact(data: { name: string; email: string; subject: string; message: string }): Promise<{ id: string; createdAt: string; message: string }> {
    const contacts = readCollection<IContact>(STORAGE_KEYS.contacts, []);
    const contact: IContact = {
      ...data,
      id: newId('contact'),
      status: 'unread',
      createdAt: new Date().toISOString(),
    };
    writeCollection(STORAGE_KEYS.contacts, [contact, ...contacts]);
    return { id: contact.id, createdAt: contact.createdAt, message: 'Message saved in this browser.' };
  },

  async getContacts(): Promise<IContact[]> {
    return readCollection(STORAGE_KEYS.contacts, []);
  },

  async updateContactStatus(id: string, status: IContact['status']): Promise<IContact> {
    const contacts = readCollection<IContact>(STORAGE_KEYS.contacts, []);
    const contact = contacts.find((item) => item.id === id);
    if (!contact) throw new Error('Contact message not found.');
    contact.status = status;
    writeCollection(STORAGE_KEYS.contacts, contacts);
    return contact;
  },

  async deleteContact(id: string): Promise<void> {
    const contacts = readCollection<IContact>(STORAGE_KEYS.contacts, []);
    writeCollection(STORAGE_KEYS.contacts, contacts.filter((contact) => contact.id !== id));
  },

  async getGithubStats(): Promise<IGithubStats> {
    const username = 'sohailsq';
    const headers = { Accept: 'application/vnd.github+json' };
    const [profileResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, { headers }),
    ]);
    if (!profileResponse.ok || !reposResponse.ok) throw new Error('GitHub profile is temporarily unavailable.');
    const profile = await profileResponse.json();
    const repos = await reposResponse.json();
    const languageCounts = new Map<string, number>();
    for (const repo of repos) {
      if (repo.language) languageCounts.set(repo.language, (languageCounts.get(repo.language) || 0) + 1);
    }
    const languageTotal = [...languageCounts.values()].reduce((sum, count) => sum + count, 0) || 1;
    const languages = [...languageCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
    return {
      username,
      profileUrl: `https://github.com/${username}`,
      totalRepos: profile.public_repos,
      publicGists: profile.public_gists,
      followers: profile.followers,
      totalContributionsLastYear: 0,
      streakDays: 0,
      primaryLanguages: languages.map(([name, count]) => ({
        name, percentage: Math.round((count / languageTotal) * 100), color: githubLanguageColors[name] || '#94a3b8',
      })),
      recentRepositories: repos.map((repo: Record<string, any>) => ({
        name: repo.name,
        description: repo.description || 'No description provided.',
        language: repo.language || 'Other',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        url: repo.html_url,
      })),
    };
  },

  async login(credentials: { email: string; password: string }): Promise<{ token: string; user: IUser }> {
    if (credentials.email.toLowerCase() !== adminUser.email || credentials.password !== 'admin123') {
      throw new Error('Invalid local demo credentials.');
    }
    localStorage.setItem(STORAGE_KEYS.token, 'local-admin');
    return { token: 'local-admin', user: adminUser };
  },

  async logout(): Promise<void> {
    localStorage.removeItem(STORAGE_KEYS.token);
  },

  async getMe(): Promise<IUser | null> {
    return localStorage.getItem(STORAGE_KEYS.token) === 'local-admin' ? adminUser : null;
  },

  async askProjectQuestion(
    projectId: string,
    question: string,
    projectDetails?: IProject,
  ): Promise<{ answer: string; sources: { title: string; url: string }[] }> {
    const project = projectDetails || await api.getProject(projectId);
    const answer = `${project.title}: ${project.description}\n\n${project.solution}\n\nArchitecture: ${project.caseStudy.architecture}\n\nTechnologies: ${project.technologies.join(', ')}.\n\nThis portfolio assistant runs locally in your browser and does not use a hosted AI service. Your question was: "${question}"`;
    return { answer, sources: [] };
  },

  async getProjectAudit(projectId: string): Promise<{ projectTitle: string; audit: string }> {
    const project = await api.getProject(projectId);
    return {
      projectTitle: project.title,
      audit: `Project overview: ${project.description}\n\nArchitecture: ${project.caseStudy.architecture}\n\nChallenges:\n${project.caseStudy.challenges.map((challenge) => `- ${challenge}`).join('\n')}\n\nReported outcomes:\n${project.caseStudy.metrics.map((metric) => `- ${metric}`).join('\n')}\n\nThis project summary is generated from the portfolio content stored in this site; it is not an independent AI audit.`,
    };
  },

  async chatWithAI(
    message: string,
    _history?: { role: string; content: string }[],
  ): Promise<{ reply: string; sources: { title: string; url: string }[] }> {
    const query = message.toLowerCase();
    const skills = await api.getSkills();
    const projects = await api.getProjects();
    const matchingSkills = skills.filter((skill) => query.includes(skill.name.toLowerCase()));
    const matchingProjects = projects.filter((project) =>
      [project.title, ...project.technologies].some((item) => query.includes(item.toLowerCase())),
    );
    const details = [
      ...matchingSkills.map((skill) => `${skill.name}: ${skill.highlight}`),
      ...matchingProjects.map((project) => `${project.title}: ${project.description}`),
    ];
    const reply = details.length
      ? `${details.join('\n\n')}\n\nThis answer uses the portfolio information available in your browser.`
      : `Sohail's portfolio highlights ${skills.slice(0, 8).map((skill) => skill.name).join(', ')} and projects including ${projects.slice(0, 4).map((project) => project.title).join(', ')}. Try asking about a specific technology or project. This assistant works locally and does not connect to a hosted AI service.`;
    return { reply, sources: [] };
  },

  async matchJobDescription(jobDescription: string): Promise<{
    matchScore: number;
    matchSummary: string;
    matchingSkills: string[];
    relevantProjects: string[];
    keyStrengths: string[];
  }> {
    const query = jobDescription.toLowerCase();
    const [skills, projects] = await Promise.all([api.getSkills(), api.getProjects()]);
    const matchingSkills = skills.filter((skill) => query.includes(skill.name.toLowerCase()));
    const relevantProjects = projects.filter((project) =>
      project.technologies.some((technology) => query.includes(technology.toLowerCase())),
    );
    const denominator = new Set([
      ...skills.map((skill) => skill.name.toLowerCase()).filter((name) => query.includes(name)),
      ...projects.flatMap((project) => project.technologies.map((technology) => technology.toLowerCase()))
        .filter((technology) => query.includes(technology)),
    ]).size;
    const matchScore = Math.min(100, Math.round((matchingSkills.length / Math.max(denominator, 1)) * 100));
    return {
      matchScore,
      matchSummary: `This local comparison found ${matchingSkills.length} matching skills and ${relevantProjects.length} relevant projects. It is a keyword-based estimate, not an AI evaluation.`,
      matchingSkills: matchingSkills.map((skill) => skill.name),
      relevantProjects: relevantProjects.map((project) => project.title),
      keyStrengths: matchingSkills.slice(0, 5).map((skill) => skill.highlight),
    };
  },
};
