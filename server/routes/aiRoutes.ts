import { Router } from 'express';
import {
  askProjectQuestion,
  getProjectAudit,
  chatWithAssistant,
  matchJobDescription,
} from '../controllers/aiController.js';

const router = Router();

router.post('/project-question', askProjectQuestion);
router.post('/project-audit', getProjectAudit);
router.post('/chat', chatWithAssistant);
router.post('/match-role', matchJobDescription);

export default router;
