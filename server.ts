import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './server/routes/index.ts';
import { connectDB } from './server/config/db.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const isProd = process.env.NODE_ENV === 'production';

  // Core middlewares
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Security headers & basic request logging
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // Health check endpoints for container and platform probes
  app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });

  app.get('/api/health', (req, res) => {
    res.status(200).json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  });

  // Mount API endpoints
  app.use('/api', apiRouter);

  // Return JSON 404 for unhandled API calls
  app.all('/api/*', (req, res) => {
    res.status(404).json({ success: false, message: 'API route not found' });
  });

  // Explicit static file serving for portfolio image assets
  // Resolves both /images/* and legacy /src/assets/images/* paths reliably in dev, prod, and containers
  const possibleImageDirs = [
    path.resolve(__dirname, 'public/images'),
    path.resolve(__dirname, 'dist/images'),
    path.resolve(__dirname, 'src/assets/images'),
  ];

  for (const dir of possibleImageDirs) {
    app.use('/images', express.static(dir, { maxAge: '7d' }));
    app.use('/src/assets/images', express.static(dir, { maxAge: '7d' }));
  }

  if (!isProd) {
    // Vite Dev Server middleware mode
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  // Global Error Handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('[Server Error]', err);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  });

  // Start listening immediately so the container passes the health check probe without delay
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Production Server] Portfolio backend active on http://0.0.0.0:${PORT}`);
  });

  // Attempt database connection in the background without blocking port binding
  connectDB().catch((err) => {
    console.warn('[Database] Background connection caught error:', err?.message || err);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
