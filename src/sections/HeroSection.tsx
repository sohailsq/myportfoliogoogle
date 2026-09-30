import React from 'react';
import { ArrowRight, Github, Linkedin, Mail, FileText, MapPin, Sparkles, Terminal as TerminalIcon } from 'lucide-react';
import { TerminalWidget } from '../components/TerminalWidget';

interface HeroSectionProps {
  onOpenResume: () => void;
  onJumpToSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume, onJumpToSection }) => {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[320px] bg-amber-500/[0.035] blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Core Positioning & Brand */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800/80 text-xs font-mono text-slate-300 backdrop-blur-sm shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-medium text-slate-200">Available for Full-Time Roles</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-slate-400">
                <MapPin className="w-3 h-3 text-amber-400" />
                Hyderabad, India
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display leading-[1.08] text-balance">
                <span className="text-slate-100">Sohail Shah</span>
              </h1>
              <p className="mt-3 text-lg sm:text-xl font-medium text-amber-400 leading-snug">
                Software Developer | Full-Stack Web Developer
              </p>
            </div>

            {/* Supporting Pitch */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-sans">
              2+ years of hands-on software development experience building responsive web applications, mobile applications, and full-stack solutions. Strong in <span className="text-slate-100 font-medium">JavaScript</span>, <span className="text-slate-100 font-medium">React.js</span>, <span className="text-slate-100 font-medium">Next.js</span>, <span className="text-slate-100 font-medium">Node.js</span>, <span className="text-slate-100 font-medium">Express.js</span>, <span className="text-slate-100 font-medium">MongoDB</span>, <span className="text-slate-100 font-medium">React Native</span>, and <span className="text-slate-100 font-medium">AWS / DevOps</span>.
            </p>

            {/* Primary Tech Stack Chips - High-scannability for engineering managers */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {['JavaScript', 'React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'React Native', 'AWS', 'Docker'].map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#0e131f] text-slate-300 border border-slate-800/80 shadow-xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  onJumpToSection('projects');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-400/10 active:scale-95 cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onJumpToSection('contact');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-slate-200 bg-[#0e131f] hover:bg-slate-850 hover:text-white border border-slate-800 hover:border-slate-700 rounded-xl transition-all active:scale-95 cursor-pointer"
              >
                <span>Contact Me</span>
                <Mail className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-amber-400 bg-transparent hover:bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Curriculum Vitae</span>
              </button>
            </div>

            {/* Social & Channel Links */}
            <div className="flex items-center gap-4 pt-3 border-t border-slate-800/60 text-slate-400 text-xs">
              <a
                href="https://github.com/mohammadsohailshahquadri14"
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a
                href="https://linkedin.com/in/mssq14/"
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a
                href="mailto:sohailshah14921@gmail.com"
                className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Terminal Widget & Profile Snippet */}
          <div className="lg:col-span-5 space-y-4">
            {/* Developer profile badge */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0e131f]/80 border border-slate-800/80 backdrop-blur-sm shadow-md">
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-700/60 relative bg-slate-950 shadow-inner">
                <img
                  src="/images/sohail_developer_portrait_1790605389453.jpg"
                  alt="Sohail Shah"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('/src/assets/images/')) {
                      target.src = '/src/assets/images/sohail_developer_portrait_1790605389453.jpg';
                    }
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-100 font-display truncate">
                    Sohail Shah
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/25 font-medium">
                    2+ Yrs Exp
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate mt-0.5 font-mono">
                  B.E. Computer Science · Deccan College
                </p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 font-mono">
                  <span className="text-slate-300">Veedly</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-300">JetFyx</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-300">NexaDeutsch</span>
                </div>
              </div>
            </div>

            {/* Interactive Terminal Widget */}
            <TerminalWidget
              onJumpToSection={onJumpToSection}
              onOpenResume={onOpenResume}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
