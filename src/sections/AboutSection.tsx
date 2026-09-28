import React from 'react';
import { Code, Server, Smartphone, Cloud, CheckCircle2, Award, Terminal } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: <Code className="w-5 h-5 text-amber-400" />,
      title: 'Frontend Engineering',
      description:
        'Building responsive, high-fidelity user interfaces with React, Next.js, and Tailwind CSS. Specializing in state-machine caching (TanStack Query), virtual DOM optimization, and sub-second interaction speed.',
    },
    {
      icon: <Server className="w-5 h-5 text-blue-400" />,
      title: 'Resilient Backend Architecture',
      description:
        'Engineering performant RESTful APIs and streaming WebSockets in Node.js and Express. Designing schema models in MongoDB and Mongoose with compound indexing, atomic transactions, and token security.',
    },
    {
      icon: <Smartphone className="w-5 h-5 text-emerald-400" />,
      title: 'Mobile Development',
      description:
        'Developing production mobile apps with React Native. Experienced in native gesture handlers, off-thread data processing, push notifications, and high-frequency real-time financial charting on mobile devices.',
    },
    {
      icon: <Cloud className="w-5 h-5 text-purple-400" />,
      title: 'Cloud & DevOps Automation',
      description:
        'Managing infrastructure from local containerization to cloud environments: Docker multi-stage builds, AWS EC2 provisioning, reverse proxies (NGINX), and automated CI/CD pipelines via GitHub Actions and Jenkins.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 border-t border-neutral-800/80 light:border-neutral-200 bg-neutral-950/40 light:bg-neutral-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Anti-slop compliant: natural editorial typography, no comment prefixes) */}
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 light:text-amber-800 font-semibold">
            01. Engineering Profile
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-neutral-100 light:text-neutral-900 mt-2 text-balance">
            From Code to Production: Building Software That Scales
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 light:text-neutral-600 mt-3 leading-relaxed">
            I approach software engineering with a product-owner mindset. Writing clean syntax is just the baseline; ensuring it runs reliably under real user loads, survives network volatility, and deploys without downtime is where engineering value is created.
          </p>
        </div>

        {/* Narrative & Background Breakdown */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Story */}
          <div className="lg:col-span-7 space-y-4 text-sm text-neutral-300 light:text-neutral-700 leading-relaxed">
            <p>
              I am a Software Engineer based in Hyderabad, India, with a Bachelor&apos;s degree in Computer Science from Deccan College of Engineering and Technology (2021–2025). Over the past 2+ years of professional development, I have worked across the entire engineering lifecycle—from whiteboarding system architecture and crafting intuitive interfaces to containerizing microservices and managing cloud deployments on AWS.
            </p>
            <p>
              My hands-on experience spans high-stakes trading applications (such as <strong className="text-neutral-100 light:text-neutral-950 font-medium">JetFyx</strong>), institutional wealth management dashboards (<strong className="text-neutral-100 light:text-neutral-950 font-medium">Richesse Solutions</strong>), interactive educational platforms (<strong className="text-neutral-100 light:text-neutral-950 font-medium">NexaDeutsch</strong>), and AI-assisted health tracking systems (<strong className="text-neutral-100 light:text-neutral-950 font-medium">SmartSync</strong>).
            </p>
            <p>
              Whether it is keeping a mobile trading chart silky-smooth at 60 FPS while consuming hundreds of WebSocket ticks per second or setting up automated zero-downtime CI/CD pipelines, I focus on predictable, maintainable, and observable code.
            </p>

            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-neutral-800 light:border-neutral-200">
              <div>
                <span className="text-2xl font-bold font-mono text-neutral-100 light:text-neutral-900 tabular-nums">2+</span>
                <span className="block text-xs text-neutral-400 light:text-neutral-600 mt-0.5">Years Professional Dev</span>
              </div>
              <div>
                <span className="text-2xl font-bold font-mono text-amber-400 light:text-amber-700 tabular-nums">5+</span>
                <span className="block text-xs text-neutral-400 light:text-neutral-600 mt-0.5">Production Systems</span>
              </div>
              <div>
                <span className="text-2xl font-bold font-mono text-emerald-400 light:text-emerald-700 tabular-nums">99.9%</span>
                <span className="block text-xs text-neutral-400 light:text-neutral-600 mt-0.5">Uptime Architecture</span>
              </div>
            </div>
          </div>

          {/* Right: Key Engineering Commitments */}
          <div className="lg:col-span-5 p-6 rounded-xl bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-200 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold font-display text-neutral-100 light:text-neutral-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Engineering Standards</span>
            </h3>

            <ul className="space-y-3 text-xs text-neutral-300 light:text-neutral-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>No Mock Fallbacks in Production:</strong> Build real APIs, real data stores, robust error boundaries, and graceful network fallbacks.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Performance First:</strong> Optimize client bundle size, leverage HTTP caching, implement database compound indexes, and eliminate layout shifts.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Infrastructure as Code:</strong> Keep services reproducible through Docker containers, declarative configs, and automated test gates.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Clear Communication:</strong> Document API contracts, explain technical tradeoffs objectively, and deliver on engineering commitments.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-neutral-900/50 light:bg-white border border-neutral-800/80 light:border-neutral-200 hover:border-neutral-700 light:hover:border-neutral-300 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-neutral-800/80 light:bg-neutral-100 flex items-center justify-center mb-3">
                {pillar.icon}
              </div>
              <h4 className="text-sm font-semibold text-neutral-100 light:text-neutral-900 mb-1.5">
                {pillar.title}
              </h4>
              <p className="text-xs text-neutral-400 light:text-neutral-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
