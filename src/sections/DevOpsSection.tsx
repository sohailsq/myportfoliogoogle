import React, { useState } from 'react';
import { Terminal, GitBranch, Play, Box, Cloud, Server, Database, CheckCircle2, ChevronRight, Copy, Check } from 'lucide-react';

interface PipelineStage {
  id: string;
  name: string;
  tool: string;
  description: string;
  codeSnippet: string;
  filename: string;
}

export const DevOpsSection: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>('stage-docker');
  const [copied, setCopied] = useState(false);

  const stages: PipelineStage[] = [
    {
      id: 'stage-dev',
      name: '01. Local Development',
      tool: 'Git & Modular Architecture',
      description: 'Modular ES modules codebase with strict linting, test-driven validation, and semantic version commits.',
      filename: 'commit-and-push.sh',
      codeSnippet: `# Interactive rebase and feature branch validation
git checkout -b feature/trading-engine-sync
npm run lint && npm test
git commit -m "feat(core): implement zero-allocation binary parser for ticks"
git push origin feature/trading-engine-sync`,
    },
    {
      id: 'stage-cicd',
      name: '02. Continuous Integration',
      tool: 'GitHub Actions / Jenkins',
      description: 'Automated test suite execution, security vulnerability scans, build verification, and container image generation.',
      filename: '.github/workflows/production-deploy.yml',
      codeSnippet: `name: Production CI/CD Pipeline
on:
  push:
    branches: [main]

jobs:
  validate-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js 20.x
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - name: Build & Push Docker Image to Registry
        run: |
          docker build -t registry.aws/sohail/app:latest .
          docker push registry.aws/sohail/app:latest`,
    },
    {
      id: 'stage-docker',
      name: '03. Containerization',
      tool: 'Docker Multi-Stage Build',
      description: 'Lightweight alpine runtime containers stripping dev dependencies and optimizing layer cache distribution.',
      filename: 'Dockerfile',
      codeSnippet: `# Multi-stage lightweight production runner
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
EXPOSE 3000
CMD ["node", "server.js"]`,
    },
    {
      id: 'stage-aws',
      name: '04. Cloud Infrastructure',
      tool: 'AWS EC2 & NGINX Proxy',
      description: 'Hardened Linux instances with SSL termination, TLS 1.3 certificates, rate-limiting reverse proxy, and systemd monitoring.',
      filename: '/etc/nginx/sites-available/portfolio.conf',
      codeSnippet: `server {
    listen 443 ssl http2;
    server_name sohailshah.dev api.sohailshah.dev;

    ssl_certificate /etc/letsencrypt/live/sohailshah.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sohailshah.dev/privkey.pem;

    # Reverse proxy to Docker container running on port 3000
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}`,
    },
    {
      id: 'stage-db',
      name: '05. Database & Persistence',
      tool: 'MongoDB Atlas & Mongoose',
      description: 'High-availability replica sets, automated daily snapshots, compound query indexing, and connection pool management.',
      filename: 'server/config/mongoAtlas.ts',
      codeSnippet: `import mongoose from 'mongoose';

export async function initProductionDatabase() {
  await mongoose.connect(process.env.MONGODB_URI!, {
    maxPoolSize: 20,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });

  // Ensure compound index on active projects
  await mongoose.connection.collection('projects').createIndex(
    { featured: 1, order: 1 },
    { background: true }
  );
  console.log('[Database] Atlas cluster synced with compound indexes.');
}`,
    },
  ];

  const activeStage = stages.find((s) => s.id === selectedStageId) || stages[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeStage.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="devops" className="py-20 md:py-28 border-t border-neutral-800/80 light:border-neutral-200 bg-neutral-950/40 light:bg-neutral-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 light:text-amber-800 font-semibold">
            05. Infrastructure &amp; Deployment
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-neutral-100 light:text-neutral-900 mt-2 text-balance">
            From Code to Production
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 light:text-neutral-600 mt-2">
            I understand that writing code is only half the battle. I engineer the entire automated journey from source commit to containerized cloud deployment.
          </p>
        </div>

        {/* Visual Deployment Flowchart Steps */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {stages.map((stage, idx) => {
            const isSelected = stage.id === selectedStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 light:bg-white border-amber-400 shadow-md ring-1 ring-amber-400/20'
                    : 'bg-neutral-950/60 light:bg-neutral-100/60 border-neutral-800 light:border-neutral-300 hover:border-neutral-700'
                }`}
              >
                <span className="block text-[11px] font-mono text-amber-400 font-semibold mb-1">
                  Step 0{idx + 1}
                </span>
                <span className="block text-xs font-semibold text-neutral-200 light:text-neutral-900 leading-tight">
                  {stage.tool}
                </span>
                <span className="block text-[10px] text-neutral-500 mt-1 line-clamp-1">
                  {stage.name.split('. ')[1]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Configuration & Topology Inspector */}
        <div className="mt-6 rounded-xl bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-200 overflow-hidden shadow-lg">
          {/* Top Inspector Bar */}
          <div className="px-5 py-3.5 bg-neutral-950 light:bg-neutral-100 border-b border-neutral-800 light:border-neutral-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-xs text-neutral-300 light:text-neutral-800 font-medium">
                {activeStage.filename}
              </span>
              <span className="text-neutral-600">·</span>
              <span className="text-xs text-neutral-400 light:text-neutral-600 hidden sm:inline">
                {activeStage.tool}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-neutral-400 hover:text-neutral-100 light:hover:text-neutral-900 bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-300 rounded transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy snippet'}</span>
            </button>
          </div>

          {/* Description banner */}
          <div className="p-4 bg-neutral-950/40 light:bg-neutral-50 border-b border-neutral-800/60 light:border-neutral-200 text-xs text-neutral-300 light:text-neutral-700 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{activeStage.description}</span>
          </div>

          {/* Code Viewer */}
          <div className="p-5 font-mono text-xs text-neutral-300 bg-neutral-950 light:bg-neutral-950 overflow-x-auto leading-relaxed">
            <pre>
              <code>{activeStage.codeSnippet}</code>
            </pre>
          </div>
        </div>

        {/* DevOps Skill Badges Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-neutral-900/40 light:bg-white border border-neutral-800/80 light:border-neutral-200">
            <span className="text-xs font-semibold text-neutral-200 light:text-neutral-900 block mb-1">
              Docker &amp; Containers
            </span>
            <p className="text-xs text-neutral-400 light:text-neutral-600">
              Multi-stage builds, Alpine optimizations, Docker Compose multi-service environments.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/40 light:bg-white border border-neutral-800/80 light:border-neutral-200">
            <span className="text-xs font-semibold text-neutral-200 light:text-neutral-900 block mb-1">
              AWS Cloud Deployment
            </span>
            <p className="text-xs text-neutral-400 light:text-neutral-600">
              EC2 host provisioning, security groups, IAM roles, S3 bucket storage, CloudWatch alarms.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/40 light:bg-white border border-neutral-800/80 light:border-neutral-200">
            <span className="text-xs font-semibold text-neutral-200 light:text-neutral-900 block mb-1">
              CI/CD Automation
            </span>
            <p className="text-xs text-neutral-400 light:text-neutral-600">
              GitHub Actions &amp; Jenkins pipelines for automated linting, test suites, and zero-downtime releases.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/40 light:bg-white border border-neutral-800/80 light:border-neutral-200">
            <span className="text-xs font-semibold text-neutral-200 light:text-neutral-900 block mb-1">
              Linux System Admin
            </span>
            <p className="text-xs text-neutral-400 light:text-neutral-600">
              Systemd daemons, NGINX reverse proxies, Bash automation scripts, and server hardening.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
