import React, { useState, useEffect } from 'react';
import { Search, Lock, UserCheck, Menu, X, FileText, ArrowUpRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
  onOpenAdmin: () => void;
  onOpenAIAssistant?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onOpenResume,
  onOpenAdmin,
  onOpenAIAssistant,
}) => {
  const { isAdmin, user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['about', 'skills', 'projects', 'experience', 'devops', 'contact'];
      const scrollPos = window.scrollY + 180;
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'DevOps', href: '#devops', id: 'devops' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080c14]/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Wordmark */}
        <a
          href="#"
          className="group flex items-center gap-2 text-base sm:text-lg font-bold font-display tracking-tight text-slate-100 hover:text-white transition-colors"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
          <span>Sohail Shah</span>
          <span className="hidden sm:inline-block text-[11px] font-mono text-slate-500 font-normal ml-1">/ dev</span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? 'text-amber-400 bg-amber-400/10 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Actions (No Theme Toggle) */}
        <div className="flex items-center gap-2">
          {/* AI Career & Tech Assistant Trigger */}
          {onOpenAIAssistant && (
            <button
              onClick={onOpenAIAssistant}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-amber-300 hover:text-amber-200 border border-amber-400/40 hover:border-amber-400/80 rounded-lg transition-all bg-amber-400/10 cursor-pointer shadow-sm"
              title="Ask Sohail's AI Career & Architecture Assistant (Gemini 3.8 Flash)"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline font-mono font-medium text-[11px]">AI Agent</span>
            </button>
          )}

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors bg-slate-900/60"
            title="Search and commands (⌘K or Ctrl+K)"
            aria-label="Open command palette"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline font-mono text-[10px] text-slate-400 px-1 py-0.5 rounded bg-slate-800/80 border border-slate-700/60">
              ⌘K
            </span>
          </button>

          {/* Admin portal trigger */}
          <button
            onClick={onOpenAdmin}
            className={`p-1.5 border rounded-lg transition-colors ${
              isAdmin
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                : 'border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 bg-slate-900/60'
            }`}
            title={isAdmin ? `Admin active: ${user?.email}` : 'Admin portal'}
            aria-label="Admin portal"
          >
            {isAdmin ? <UserCheck className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
          </button>

          {/* Resume button */}
          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-sm active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-200 border border-slate-800 rounded-lg bg-slate-900/60"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#080c14]/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-900 rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>View &amp; Print Resume (PDF)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
