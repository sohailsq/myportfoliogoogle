import mongoose, { Schema } from 'mongoose';

// User Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

// Project Schema
const projectSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  subtitle: { type: String, required: true },
  category: { type: String, required: true, enum: ['Full-Stack', 'Mobile', 'Fintech', 'AI/ML', 'Cloud'] },
  description: { type: String, required: true },
  problem: { type: String, required: true },
  solution: { type: String, required: true },
  contribution: { type: String, required: true },
  technologies: [{ type: String }],
  image: { type: String, required: true },
  githubUrl: { type: String, required: true },
  liveUrl: { type: String },
  secondaryLiveUrl: { type: String },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  caseStudy: {
    architecture: { type: String, default: '' },
    challenges: [{ type: String }],
    metrics: [{ type: String }]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Experience Schema
const experienceSchema = new Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  location: { type: String, required: true },
  period: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  isCurrent: { type: Boolean, default: false },
  type: { type: String, enum: ['Full-time', 'Contract', 'Education'], default: 'Full-time' },
  description: [{ type: String }],
  technologies: [{ type: String }],
  highlights: [{ type: String }],
  order: { type: Number, default: 0 }
});

// Skill Schema
const skillSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  proficiency: { type: String, enum: ['Expert', 'Advanced', 'Intermediate'], default: 'Advanced' },
  yearsOfExperience: { type: Number, default: 2 },
  highlight: { type: String, default: '' },
  order: { type: Number, default: 0 }
});

// Contact Schema
const contactSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['unread', 'read', 'replied'], default: 'unread' },
  createdAt: { type: Date, default: Date.now }
});

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
export const ProjectModel = mongoose.models.Project || mongoose.model('Project', projectSchema);
export const ExperienceModel = mongoose.models.Experience || mongoose.model('Experience', experienceSchema);
export const SkillModel = mongoose.models.Skill || mongoose.model('Skill', skillSchema);
export const ContactModel = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
