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
      description: 'Modular ES modules codebase with strict linting, test-driven validation, and clean version control workflows.',
      filename: 'commit-and-push.sh',
      codeSnippet: `# Feature branch and code quality verification
git checkout -b feature/trading-engine-sync
npm run lint && npm test
git commit -m "feat(core): implement resilient websocket stream handler"
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
      - name: Build & Push Docker Image
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
    server_name api.sohailshah.dev;

    ssl_certificate /etc/letsencrypt/live/sohailshah.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sohailshah.dev/privkey.pem;

    location /api/ {
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
      name: '05. Database & Telemetry',
      tool: 'MongoDB Atlas & Monitoring',
      description: 'Managed replica set clusters with automated daily snapshots, connection pool throttling, and automated alerting.',
      filename: 'mongo-connection.js',
      codeSnippet: `// High-concurrency connection pooling
const mongoose = require('mongoose');

const connectDatabase = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    maxPoolSize: 50,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    autoIndex: process.env.NODE_ENV !== 'production',
  });
  console.log('MongoDB Atlas: Connection established with connection pool');
};`,
    },
  ];

  const activeStage = stages.find((s) => s.id === selectedStageId) || stages[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeStage.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="devops" className="py-20 md:py-28 border-t border-slate-800/80 bg-[#0a0e17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            05. DevOps &amp; Cloud Lifecycle
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-100 mt-2 text-balance">
            From Code to Production: The Deployment Pipeline
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed font-sans">
            A reliable software product is only as good as its deployment pipeline. Here is how I architect, containerize, and deploy applications to production on AWS with Docker and CI/CD.
          </p>
        </div>

        {/* Visual Pipeline Stepper */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-2 border-b border-slate-800/80 pb-6">
          {stages.map((stage) => {
            const isSelected = stage.id === selectedStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#0e131f] border-amber-400/80 text-slate-100 shadow-sm'
                    : 'bg-[#0e131f]/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span className="block text-[11px] font-mono text-amber-400 font-semibold">
                  {stage.name.split('.')[0]}
                </span>
                <span className="block text-xs font-semibold mt-0.5 truncate font-display">
                  {stage.name.split('. ')[1]}
                </span>
                <span className="block text-[10px] text-slate-500 font-mono truncate mt-0.5">
                  {stage.tool.split('&')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Stage Content Detail & Terminal Code View */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Description (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#0e131f]/75 border border-slate-800/80 space-y-3 shadow-md">
              <span className="text-xs font-mono text-amber-400 font-semibold block">
                {activeStage.name}
              </span>
              <h3 className="text-lg font-bold font-display text-slate-100">
                {activeStage.tool}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {activeStage.description}
              </p>

              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Automated linting and test validation</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Reproducible isolated environment</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Continuous delivery without manual steps</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Code Viewer (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#070a12] border border-slate-800/90 overflow-hidden shadow-2xl">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0c101a] border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400">
                  {activeStage.filename}
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                title="Copy configuration snippet"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Body */}
            <pre className="p-4 sm:p-5 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed bg-[#070a12]">
              <code>{activeStage.codeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
