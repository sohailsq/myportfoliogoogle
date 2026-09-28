import { Router } from 'express';
import { getAllExperience, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', getAllExperience);
router.post('/', authenticate, requireAdmin, createExperience);
router.put('/:id', authenticate, requireAdmin, updateExperience);
router.delete('/:id', authenticate, requireAdmin, deleteExperience);

export default router;
