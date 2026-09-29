import { Router } from 'express';
import { login, logout, getMe } from '../controllers/authController.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticate, getMe);

export default router;
