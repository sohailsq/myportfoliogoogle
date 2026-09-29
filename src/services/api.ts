import { IProject, IExperience, ISkill, IContact, IGithubStats, IUser } from '../types';

const BASE_URL = '/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('sohail_auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  // Projects
  async getProjects(category?: string): Promise<IProject[]> {
    const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    const res = await fetch(`${BASE_URL}/projects${query}`);
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to fetch projects');
    return json.data;
  },

  async getProject(slug: string): Promise<IProject> {
    const res = await fetch(`${BASE_URL}/projects/${slug}`);
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to fetch project');
    return json.data;
  },

  async createProject(data: Partial<IProject>): Promise<IProject> {
    const res = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to create project');
    return json.data;
  },

  async updateProject(id: string, data: Partial<IProject>): Promise<IProject> {
    const res = await fetch(`${BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to update project');
    return json.data;
  },

  async deleteProject(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to delete project');
  },

  async resetProjects(): Promise<IProject[]> {
    const res = await fetch(`${BASE_URL}/projects/reset/seeds`, {
      method: 'POST',
      headers: { ...getAuthHeader() },
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to reset projects');
    return json.data;
  },

  // Experience
  async getExperience(): Promise<IExperience[]> {
    const res = await fetch(`${BASE_URL}/experience`);
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to fetch experience');
    return json.data;
  },

  async createExperience(data: Partial<IExperience>): Promise<IExperience> {
    const res = await fetch(`${BASE_URL}/experience`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to create experience');
    return json.data;
  },

  async updateExperience(id: string, data: Partial<IExperience>): Promise<IExperience> {
    const res = await fetch(`${BASE_URL}/experience/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to update experience');
    return json.data;
  },

  async deleteExperience(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/experience/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to delete experience');
  },

  // Skills
  async getSkills(category?: string): Promise<ISkill[]> {
    const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    const res = await fetch(`${BASE_URL}/skills${query}`);
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to fetch skills');
    return json.data;
  },

  async createSkill(data: Partial<ISkill>): Promise<ISkill> {
    const res = await fetch(`${BASE_URL}/skills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to create skill');
    return json.data;
  },

  async updateSkill(id: string, data: Partial<ISkill>): Promise<ISkill> {
    const res = await fetch(`${BASE_URL}/skills/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to update skill');
    return json.data;
  },

  async deleteSkill(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/skills/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to delete skill');
  },

  // Contacts
  async submitContact(data: { name: string; email: string; subject: string; message: string }): Promise<{ id: string; createdAt: string; message: string }> {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to submit contact message');
    return { ...json.data, message: json.message };
  },

  async getContacts(): Promise<IContact[]> {
    const res = await fetch(`${BASE_URL}/contact`, {
      headers: { ...getAuthHeader() },
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to fetch contacts');
    return json.data;
  },

  async updateContactStatus(id: string, status: 'unread' | 'read' | 'replied'): Promise<IContact> {
    const res = await fetch(`${BASE_URL}/contact/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ status }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to update message status');
    return json.data;
  },

  async deleteContact(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/contact/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to delete message');
  },

  // GitHub Stats
  async getGithubStats(): Promise<IGithubStats> {
    const res = await fetch(`${BASE_URL}/github/stats`);
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to fetch GitHub stats');
    return json.data;
  },

  // Auth
  async login(credentials: { email: string; password: string }): Promise<{ token: string; user: IUser }> {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Authentication failed');
    localStorage.setItem('sohail_auth_token', json.token);
    return { token: json.token, user: json.user };
  },

  async logout(): Promise<void> {
    try {
      await fetch(`${BASE_URL}/auth/logout`, { method: 'POST', headers: { ...getAuthHeader() } });
    } finally {
      localStorage.removeItem('sohail_auth_token');
    }
  },

  async getMe(): Promise<IUser | null> {
    const token = localStorage.getItem('sohail_auth_token');
    if (!token) return null;
    try {
      const res = await fetch(`${BASE_URL}/auth/me`, {
        headers: { ...getAuthHeader() },
      });
      const json = await res.json();
      if (!json.success) {
        localStorage.removeItem('sohail_auth_token');
        return null;
      }
      return json.user;
    } catch {
      return null;
    }
  },

  // AI Features (Gemini 3.8 Flash)
  async askProjectQuestion(
    projectId: string,
    question: string,
    projectDetails?: any
  ): Promise<{ answer: string; sources: { title: string; url: string }[] }> {
    const res = await fetch(`${BASE_URL}/ai/project-question`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId, question, projectDetails }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to get answer from Gemini AI');
    return json.data;
  },

  async getProjectAudit(projectId: string): Promise<{ projectTitle: string; audit: string }> {
    const res = await fetch(`${BASE_URL}/ai/project-audit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to generate project audit');
    return json.data;
  },

  async chatWithAI(
    message: string,
    history?: { role: string; content: string }[]
  ): Promise<{ reply: string; sources: { title: string; url: string }[] }> {
    const res = await fetch(`${BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to chat with AI assistant');
    return json.data;
  },

  async matchJobDescription(jobDescription: string): Promise<{
    matchScore: number;
    matchSummary: string;
    matchingSkills: string[];
    relevantProjects: string[];
    keyStrengths: string[];
  }> {
    const res = await fetch(`${BASE_URL}/ai/match-role`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobDescription }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to analyze job description');
    return json.data;
  },
};
