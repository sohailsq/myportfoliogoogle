import { Router } from 'express';
import { getGithubStats } from '../controllers/githubController.ts';

const router = Router();

router.get('/stats', getGithubStats);

export default router;
