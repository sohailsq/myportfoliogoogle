import { Router } from 'express';
import authRoutes from './authRoutes.js';
import projectRoutes from './projectRoutes.js';
import experienceRoutes from './experienceRoutes.js';
import skillRoutes from './skillRoutes.js';
import contactRoutes from './contactRoutes.js';
import githubRoutes from './githubRoutes.js';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/projects', projectRoutes);
apiRouter.use('/experience', experienceRoutes);
apiRouter.use('/skills', skillRoutes);
apiRouter.use('/contact', contactRoutes);
apiRouter.use('/github', githubRoutes);

apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'Sohail Shah Quadri Portfolio API'
  });
});

export default apiRouter;
