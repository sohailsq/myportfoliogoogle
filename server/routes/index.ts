import { Router } from 'express';
import authRoutes from './authRoutes.ts';
import projectRoutes from './projectRoutes.ts';
import experienceRoutes from './experienceRoutes.ts';
import skillRoutes from './skillRoutes.ts';
import contactRoutes from './contactRoutes.ts';
import githubRoutes from './githubRoutes.ts';
import aiRoutes from './aiRoutes.ts';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/projects', projectRoutes);
apiRouter.use('/experience', experienceRoutes);
apiRouter.use('/skills', skillRoutes);
apiRouter.use('/contact', contactRoutes);
apiRouter.use('/github', githubRoutes);
apiRouter.use('/ai', aiRoutes);

apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'Sohail Shah Quadri Portfolio API'
  });
});

export default apiRouter;
