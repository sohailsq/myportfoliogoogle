import mongoose from 'mongoose';
import { initialUsers, initialProjects, initialExperience, initialSkills, initialContacts } from '../data/seedData.js';
import { IUser, IProject, IExperience, ISkill, IContact } from '../types.js';

let isMongoConnected = false;

// In-memory fallback stores
let usersStore: IUser[] = [...initialUsers];
let projectsStore: IProject[] = [...initialProjects];
let experienceStore: IExperience[] = [...initialExperience];
let skillsStore: ISkill[] = [...initialSkills];
let contactsStore: IContact[] = [...initialContacts];

export async function connectDB(): Promise<boolean> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('[Database] MONGODB_URI not specified. Operating in high-performance in-memory repository mode.');
    return false;
  }

  try {
    await mongoose.connect(uri);
    isMongoConnected = true;
    console.log('[Database] Successfully connected to MongoDB Atlas.');
    return true;
  } catch (error) {
    console.error('[Database] MongoDB connection failed, falling back to local memory store:', error);
    isMongoConnected = false;
    return false;
  }
}

export function isUsingMongoDB(): boolean {
  return isMongoConnected;
}

// Unified Database Repository interface
export const dbRepo = {
  // Users
  users: {
    findByEmail: async (email: string): Promise<IUser | null> => {
      const user = usersStore.find(u => u.email.toLowerCase() === email.toLowerCase());
      return user || null;
    },
    findById: async (id: string): Promise<IUser | null> => {
      const user = usersStore.find(u => u.id === id);
      return user || null;
    }
  },

  // Projects
  projects: {
    getAll: async (): Promise<IProject[]> => {
      return [...projectsStore].sort((a, b) => a.order - b.order);
    },
    getBySlug: async (slug: string): Promise<IProject | null> => {
      return projectsStore.find(p => p.slug === slug) || null;
    },
    getById: async (id: string): Promise<IProject | null> => {
      return projectsStore.find(p => p.id === id) || null;
    },
    create: async (data: Omit<IProject, 'id' | 'createdAt' | 'updatedAt'>): Promise<IProject> => {
      const newProject: IProject = {
        ...data,
        id: `proj-${Date.now()}`,
        slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      projectsStore.unshift(newProject);
      return newProject;
    },
    update: async (id: string, data: Partial<IProject>): Promise<IProject | null> => {
      const index = projectsStore.findIndex(p => p.id === id);
      if (index === -1) return null;
      projectsStore[index] = {
        ...projectsStore[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      return projectsStore[index];
    },
    delete: async (id: string): Promise<boolean> => {
      const initialLength = projectsStore.length;
      projectsStore = projectsStore.filter(p => p.id !== id);
      return projectsStore.length < initialLength;
    },
    reset: async (): Promise<void> => {
      projectsStore = [...initialProjects];
    }
  },

  // Experience
  experience: {
    getAll: async (): Promise<IExperience[]> => {
      return [...experienceStore].sort((a, b) => a.order - b.order);
    },
    getById: async (id: string): Promise<IExperience | null> => {
      return experienceStore.find(e => e.id === id) || null;
    },
    create: async (data: Omit<IExperience, 'id'>): Promise<IExperience> => {
      const newExp: IExperience = {
        ...data,
        id: `exp-${Date.now()}`,
      };
      experienceStore.push(newExp);
      return newExp;
    },
    update: async (id: string, data: Partial<IExperience>): Promise<IExperience | null> => {
      const index = experienceStore.findIndex(e => e.id === id);
      if (index === -1) return null;
      experienceStore[index] = { ...experienceStore[index], ...data };
      return experienceStore[index];
    },
    delete: async (id: string): Promise<boolean> => {
      const initialLength = experienceStore.length;
      experienceStore = experienceStore.filter(e => e.id !== id);
      return experienceStore.length < initialLength;
    },
    reset: async (): Promise<void> => {
      experienceStore = [...initialExperience];
    }
  },

  // Skills
  skills: {
    getAll: async (): Promise<ISkill[]> => {
      return [...skillsStore].sort((a, b) => a.order - b.order);
    },
    getById: async (id: string): Promise<ISkill | null> => {
      return skillsStore.find(s => s.id === id) || null;
    },
    create: async (data: Omit<ISkill, 'id'>): Promise<ISkill> => {
      const newSkill: ISkill = {
        ...data,
        id: `sk-${Date.now()}`,
      };
      skillsStore.push(newSkill);
      return newSkill;
    },
    update: async (id: string, data: Partial<ISkill>): Promise<ISkill | null> => {
      const index = skillsStore.findIndex(s => s.id === id);
      if (index === -1) return null;
      skillsStore[index] = { ...skillsStore[index], ...data };
      return skillsStore[index];
    },
    delete: async (id: string): Promise<boolean> => {
      const initialLength = skillsStore.length;
      skillsStore = skillsStore.filter(s => s.id !== id);
      return skillsStore.length < initialLength;
    },
    reset: async (): Promise<void> => {
      skillsStore = [...initialSkills];
    }
  },

  // Contacts
  contacts: {
    getAll: async (): Promise<IContact[]> => {
      return [...contactsStore].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },
    create: async (data: Omit<IContact, 'id' | 'status' | 'createdAt'>): Promise<IContact> => {
      const newContact: IContact = {
        ...data,
        id: `cnt-${Date.now()}`,
        status: 'unread',
        createdAt: new Date().toISOString(),
      };
      contactsStore.unshift(newContact);
      return newContact;
    },
    updateStatus: async (id: string, status: 'unread' | 'read' | 'replied'): Promise<IContact | null> => {
      const contact = contactsStore.find(c => c.id === id);
      if (!contact) return null;
      contact.status = status;
      return contact;
    },
    delete: async (id: string): Promise<boolean> => {
      const initialLength = contactsStore.length;
      contactsStore = contactsStore.filter(c => c.id !== id);
      return contactsStore.length < initialLength;
    }
  }
};
