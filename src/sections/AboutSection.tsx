import React from 'react';
import { Code, Server, Smartphone, Cloud, CheckCircle2, Award, Terminal, Layers } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: <Code className="w-5 h-5 text-amber-400" />,
      title: 'Frontend & UI Architecture',
      description:
        'Building responsive, modular UI components with React.js, Next.js, and modern CSS/Tailwind. Focused on component reusability, optimal render cycles, accessible design, and fluid user experiences across viewports.',
    },
    {
      icon: <Server className="w-5 h-5 text-sky-400" />,
      title: 'Backend & RESTful Services',
      description:
        'Designing performant REST APIs and WebSocket data streams in Node.js and Express.js. Engineering MongoDB and Mongoose database schemas with indexing, secure JWT authentication, and structured validation pipelines.',
    },
    {
      icon: <Smartphone className="w-5 h-5 text-emerald-400" />,
      title: 'Cross-Platform Mobile Apps',
      description:
        'Developing production mobile applications with React Native and Flutter. Experienced with high-frequency trading clients (JetFyx), stateful workflows, and multi-tenant platforms (Veedly, Howzdat).',
    },
    {
      icon: <Cloud className="w-5 h-5 text-purple-400" />,
      title: 'Cloud Deployment & DevOps',
      description:
        'Managing infrastructure from local containerization to cloud environments: Docker multi-stage builds, AWS EC2 provisioning, automated CI/CD pipelines via GitHub Actions and Jenkins, and cloud hosting on Vercel and Render.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 border-t border-slate-800/80 bg-[#080b11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            01. Engineering Profile
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-100 mt-2 text-balance">
            Building Robust, Scalable Software for the Real World
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed font-sans">
            I approach software engineering with a product-first mindset. Writing clean, maintainable code is the baseline; ensuring it performs reliably under high-frequency data loads, works seamlessly across devices, and deploys without downtime is where true engineering value is created.
          </p>
        </div>

        {/* Narrative & Background Breakdown */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Story (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-4 text-sm text-slate-300 leading-relaxed font-sans">
            <p>
              I am a Software Developer based in Hyderabad, India, with a Bachelor&apos;s degree in Computer Science from Deccan College of Engineering and Technology (2021–2025). Over the past 2+ years of professional development, I have worked across the entire engineering lifecycle—from whiteboarding system architecture and crafting intuitive interfaces to building backend APIs and deploying containerized applications.
            </p>
            <p>
              My hands-on experience spans high-stakes trading platforms (such as <strong className="text-slate-100 font-medium">JetFyx</strong>), multi-tenant vendor commerce platforms (<strong className="text-slate-100 font-medium">Veedly</strong>), interactive German language portals (<strong className="text-slate-100 font-medium">NexaDeutsch</strong>), fintech wealth dashboards (<strong className="text-slate-100 font-medium">Richesse Solutions</strong>), and healthcare applications (<strong className="text-slate-100 font-medium">SmartSync</strong>).
            </p>
            <p>
              Whether it is keeping a mobile trading chart responsive while consuming real-time WebSocket market streams or setting up automated CI/CD deployment pipelines on AWS EC2, I prioritize clean architecture, systematic debugging, and reliable user experiences.
            </p>

            {/* Quick Metrics */}
            <div className="pt-4 grid grid-cols-3 gap-3.5 border-t border-slate-800/80">
              <div className="p-4 rounded-xl bg-[#0e131f]/70 border border-slate-800/80 shadow-xs">
                <span className="text-2xl font-bold font-mono text-slate-100 tabular-nums">2+</span>
                <span className="block text-xs text-slate-400 mt-1">Years Professional Dev</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0e131f]/70 border border-slate-800/80 shadow-xs">
                <span className="text-2xl font-bold font-mono text-amber-400 tabular-nums">5+</span>
                <span className="block text-xs text-slate-400 mt-1">Production Systems</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0e131f]/70 border border-slate-800/80 shadow-xs">
                <span className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">99.9%</span>
                <span className="block text-xs text-slate-400 mt-1">Deployment Uptime</span>
              </div>
            </div>
          </div>

          {/* Right: Engineering Principles (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-[#0e131f]/70 border border-slate-800/80 shadow-md space-y-4">
            <h3 className="text-sm font-semibold font-display text-slate-100 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Engineering Principles</span>
            </h3>

            <ul className="space-y-3.5 text-xs text-slate-300 font-sans leading-relaxed">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-slate-100 font-medium">Reusable &amp; Modular Code:</strong> Construct clean, self-contained components and decoupled services that simplify team development and scaling.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-slate-100 font-medium">Systematic Debugging:</strong> Isolate frontend, API, UI, and application-level issues methodically using browser devtools and telemetry.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-slate-100 font-medium">Performance &amp; State Management:</strong> Handle asynchronous data efficiently using TanStack Query / RTK Query with background caching and zero UI stutter.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-slate-100 font-medium">Production-Ready Deployment:</strong> Containerize workloads with Docker and automate tests and staging via CI/CD pipelines before any code hits production.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 4 Architectural Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0e131f]/60 border border-slate-800/80 hover:border-slate-700/90 transition-all card-glow flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center mb-3.5">
                  {p.icon}
                </div>
                <h4 className="text-sm font-semibold font-display text-slate-100 mb-2">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
