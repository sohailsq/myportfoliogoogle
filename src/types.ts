export interface IProject {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  category: 'Full-Stack' | 'Mobile' | 'Fintech' | 'AI/ML' | 'Cloud';
  description: string;
  problem: string;
  solution: string;
  contribution: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
  secondaryLiveUrl?: string;
  featured: boolean;
  order: number;
  caseStudy: {
    architecture: string;
    challenges: string[];
    metrics: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface IExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  period: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  type: 'Full-time' | 'Contract' | 'Education';
  description: string[];
  technologies: string[];
  highlights: string[];
  order: number;
}

export interface ISkill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'Cloud / DevOps' | 'DevOps & Cloud' | 'Languages' | 'Databases' | 'Tools' | string;
  proficiency: 'Expert' | 'Advanced' | 'Intermediate';
  yearsOfExperience: number;
  highlight: string;
  order: number;
}

export interface IContact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface IGithubStats {
  username: string;
  profileUrl: string;
  totalRepos: number;
  publicGists: number;
  followers: number;
  totalContributionsLastYear: number;
  streakDays: number;
  primaryLanguages: { name: string; percentage: number; color: string }[];
  recentRepositories: {
    name: string;
    description: string;
    language: string;
    stars: number;
    forks: number;
    updatedAt: string;
    url: string;
  }[];
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}
