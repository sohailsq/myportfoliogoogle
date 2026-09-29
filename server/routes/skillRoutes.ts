import { Router } from 'express';
import { getAllSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skillController.ts';
import { authenticate, requireAdmin } from '../middleware/auth.ts';

const router = Router();

router.get('/', getAllSkills);
router.post('/', authenticate, requireAdmin, createSkill);
router.put('/:id', authenticate, requireAdmin, updateSkill);
router.delete('/:id', authenticate, requireAdmin, deleteSkill);

export default router;
