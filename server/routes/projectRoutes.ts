import { Router } from 'express';
import { getAllProjects, getProjectBySlug, createProject, updateProject, deleteProject, resetProjects } from '../controllers/projectController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', getAllProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', authenticate, requireAdmin, createProject);
router.put('/:id', authenticate, requireAdmin, updateProject);
router.delete('/:id', authenticate, requireAdmin, deleteProject);
router.post('/reset/seeds', authenticate, requireAdmin, resetProjects);

export default router;
