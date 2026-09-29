import React from 'react';
import { ArrowRight, Github, Linkedin, Mail, FileText, MapPin, Sparkles } from 'lucide-react';
import { TerminalWidget } from '../components/TerminalWidget';

interface HeroSectionProps {
  onOpenResume: () => void;
  onJumpToSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume, onJumpToSection }) => {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Subtle radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Positioning & Brand */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status indicator (Zero-pill compliant: unboxed clean text) */}
            <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 light:text-neutral-600">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for engineering roles</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-neutral-400">
                <MapPin className="w-3 h-3 text-amber-400" />
                Hyderabad, India
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-neutral-100 light:text-neutral-900 leading-[1.1] text-balance">
                Sohail Shah Quadri
              </h1>
              <p className="mt-3 text-lg sm:text-xl font-medium text-amber-400 light:text-amber-800 leading-snug">
                Software Engineer building scalable web &amp; mobile applications.
              </p>
            </div>

            {/* Supporting Pitch */}
            <p className="text-sm sm:text-base text-neutral-400 light:text-neutral-600 leading-relaxed max-w-2xl">
              I build modern digital products using JavaScript, React, Next.js, Node.js, MongoDB, React Native, AWS and DevOps technologies. From high-frequency trading clients to distributed cloud microservices.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  onJumpToSection('projects');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onJumpToSection('contact');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-neutral-200 light:text-neutral-800 bg-neutral-900 light:bg-neutral-100 hover:bg-neutral-800 light:hover:bg-neutral-200 border border-neutral-800 light:border-neutral-300 rounded-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Let&apos;s Connect</span>
                <Mail className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-neutral-400 light:text-neutral-600 hover:text-neutral-100 light:hover:text-neutral-900 transition-colors ml-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Curriculum Vitae</span>
              </button>
            </div>

            {/* Social & Channel Links */}
            <div className="flex items-center gap-5 pt-3 border-t border-neutral-800/60 light:border-neutral-200 text-neutral-400 light:text-neutral-600 text-xs">
              <a
                href="https://github.com/mohammadsohailshahquadri14"
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <a
                href="https://linkedin.com/in/mssq14/"
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <a
                href="mailto:sohailshah14921@gmail.com"
                className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Developer Command Center & Portrait Lockup */}
          <div className="lg:col-span-5 space-y-4">
            {/* Developer Headshot Avatar Card */}
            <div className="flex items-center gap-4 p-3.5 rounded-xl bg-neutral-900/60 light:bg-neutral-100/90 border border-neutral-800/80 light:border-neutral-200">
              <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-neutral-700/60 light:border-neutral-300 relative bg-neutral-950">
                <img
                  src="/src/assets/images/sohail_developer_portrait_1790605389453.jpg"
                  alt="Sohail Shah Quadri"
                  className="w-full h-full object-cover"
                  loading="eager"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="text-xs">
                <span className="font-bold text-neutral-100 light:text-neutral-900 block font-display">
                  Sohail Shah Quadri
                </span>
                <span className="text-neutral-400 light:text-neutral-600 block text-[11px]">
                  B.E. Computer Science · Deccan College of Engineering (2021–2025)
                </span>
                <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-amber-400">
                  <span>2+ Years Experience</span>
                  <span className="text-neutral-600">·</span>
                  <span>Full-Stack &amp; DevOps</span>
                </div>
              </div>
            </div>

            {/* Interactive Terminal / Command Center */}
            <TerminalWidget onJumpToSection={onJumpToSection} onOpenResume={onOpenResume} />
          </div>
        </div>
      </div>
    </section>
  );
};
