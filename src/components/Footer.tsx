import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#06090f] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-base font-bold font-display text-slate-100 flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Sohail Shah
            </span>
            <p className="text-xs text-slate-400 mt-1 max-w-md font-sans">
              Software Developer | Full-Stack Web Developer based in Hyderabad, India. Focused on performant web, mobile, and cloud systems.
            </p>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <a
              href="https://github.com/mohammadsohailshahquadri14"
              target="_blank"
              rel="noreferrer noopener"
              className="p-2.5 rounded-xl bg-[#0e131f] border border-slate-800/90 hover:text-amber-400 hover:border-slate-700 transition-colors shadow-xs"
              aria-label="GitHub profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/mssq14/"
              target="_blank"
              rel="noreferrer noopener"
              className="p-2.5 rounded-xl bg-[#0e131f] border border-slate-800/90 hover:text-amber-400 hover:border-slate-700 transition-colors shadow-xs"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:sohailshah14921@gmail.com"
              className="p-2.5 rounded-xl bg-[#0e131f] border border-slate-800/90 hover:text-amber-400 hover:border-slate-700 transition-colors shadow-xs"
              aria-label="Send email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 border border-slate-800/90 rounded-xl bg-[#0e131f] hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer shadow-xs active:scale-95"
              aria-label="Scroll back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800/70 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-3">
          <div>
            © {new Date().getFullYear()} Sohail Shah. Engineered with React, Express &amp; MongoDB.
          </div>
          <div className="flex items-center gap-3">
            <span>Hyderabad, Telangana, India</span>
            <span>·</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              REST API Active
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
