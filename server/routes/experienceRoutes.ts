import { Router } from 'express';
import { getAllExperience, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController.ts';
import { authenticate, requireAdmin } from '../middleware/auth.ts';

const router = Router();

router.get('/', getAllExperience);
router.post('/', authenticate, requireAdmin, createExperience);
router.put('/:id', authenticate, requireAdmin, updateExperience);
router.delete('/:id', authenticate, requireAdmin, deleteExperience);

export default router;
