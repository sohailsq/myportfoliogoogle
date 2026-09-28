import { Request, Response } from 'express';
import { dbRepo } from '../config/db.js';

export async function getAllProjects(req: Request, res: Response) {
  try {
    const { category, featured } = req.query;
    let projects = await dbRepo.projects.getAll();

    if (category && category !== 'All') {
      projects = projects.filter(p => p.category.toLowerCase() === (category as string).toLowerCase());
    }

    if (featured === 'true') {
      projects = projects.filter(p => p.featured);
    }

    return res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve projects.' });
  }
}

export async function getProjectBySlug(req: Request, res: Response) {
  try {
    const { slug } = req.params;
    let project = await dbRepo.projects.getBySlug(slug);

    if (!project) {
      project = await dbRepo.projects.getById(slug);
    }

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    return res.json({ success: true, data: project });
  } catch (error) {
    console.error('Error fetching project:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve project details.' });
  }
}

export async function createProject(req: Request, res: Response) {
  try {
    const { title, subtitle, category, description, problem, solution, contribution, technologies, image, githubUrl, liveUrl, featured, caseStudy } = req.body;

    if (!title || !description || !problem || !solution) {
      return res.status(400).json({ success: false, message: 'Title, description, problem, and solution are required.' });
    }

    const newProject = await dbRepo.projects.create({
      title,
      slug: req.body.slug,
      subtitle: subtitle || 'Modern Software Engineering Project',
      category: category || 'Full-Stack',
      description,
      problem,
      solution,
      contribution: contribution || 'Full architecture and implementation',
      technologies: Array.isArray(technologies) ? technologies : (technologies ? technologies.split(',').map((t: string) => t.trim()) : ['React', 'Node.js']),
      image: image || '/src/assets/images/hero_developer_workspace_1790605403219.jpg',
      githubUrl: githubUrl || 'https://github.com/sohailshah',
      liveUrl: liveUrl || '',
      featured: Boolean(featured),
      order: req.body.order || 99,
      caseStudy: caseStudy || {
        architecture: 'Microservices architecture with cloud CI/CD deployment',
        challenges: ['High concurrency and real-time state synchronization'],
        metrics: ['Sub-100ms latency', 'Zero-downtime deployment']
      }
    });

    return res.status(201).json({ success: true, message: 'Project created successfully', data: newProject });
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({ success: false, message: 'Failed to create project.' });
  }
}

export async function updateProject(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updated = await dbRepo.projects.update(id, req.body);

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    return res.json({ success: true, message: 'Project updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({ success: false, message: 'Failed to update project.' });
  }
}

export async function deleteProject(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await dbRepo.projects.delete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    return res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete project.' });
  }
}

export async function resetProjects(req: Request, res: Response) {
  try {
    await dbRepo.projects.reset();
    const all = await dbRepo.projects.getAll();
    return res.json({ success: true, message: 'Projects reset to seed data.', data: all });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to reset projects.' });
  }
}
