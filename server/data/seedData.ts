import bcrypt from 'bcryptjs';
import type { IContact, IUser } from '../types.ts';
import { initialExperience, initialProjects, initialSkills } from '../../src/data/portfolioData.ts';

export { initialExperience, initialProjects, initialSkills };

export const initialAdminPassword = 'admin123';
export const initialAdminPasswordHash = bcrypt.hashSync(initialAdminPassword, 10);

export const initialUsers: IUser[] = [
  {
    id: 'user-admin-1',
    name: 'Sohail Shah',
    email: 'admin@sohailshah.dev',
    password: initialAdminPasswordHash,
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
];

export const initialContacts: IContact[] = [];
