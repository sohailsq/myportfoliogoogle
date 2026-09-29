import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-800/80 light:border-neutral-200 bg-neutral-950 light:bg-neutral-50 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-base font-bold font-display text-neutral-100 light:text-neutral-900">
              Sohail Shah Quadri
            </span>
            <p className="text-xs text-neutral-400 light:text-neutral-600 mt-1 max-w-md">
              Software Engineer & Full-Stack Developer based in Hyderabad, India. Focused on performant web, mobile, and cloud systems.
            </p>
          </div>

          <div className="flex items-center gap-5 text-neutral-400 light:text-neutral-600">
            <a
              href="https://github.com/mohammadsohailshahquadri14"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-400 transition-colors"
              aria-label="GitHub profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/mssq14/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-400 transition-colors"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:sohailshah14921@gmail.com"
              className="hover:text-amber-400 transition-colors"
              aria-label="Send email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 border border-neutral-800 light:border-neutral-300 rounded-md hover:bg-neutral-900 light:hover:bg-neutral-200 transition-colors text-neutral-400 light:text-neutral-600 ml-2"
              aria-label="Scroll back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-800/40 light:border-neutral-200 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 light:text-neutral-600 gap-3">
          <div>
            © {new Date().getFullYear()} Sohail Shah Quadri. Engineered with React, Node.js, Express & MongoDB.
          </div>
          <div className="flex items-center gap-4">
            <span>Hyderabad, Telangana, India</span>
            <span aria-hidden="true">·</span>
            <span>REST API Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
