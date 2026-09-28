import React, { useState, useEffect } from 'react';
import { Sun, Moon, Search, Lock, UserCheck, Menu, X, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onOpenResume,
  onOpenAdmin,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { isAdmin, user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'DevOps', href: '#devops' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-neutral-950/85 dark:bg-neutral-950/85 light:bg-white/85 backdrop-blur-md border-b border-neutral-800/60 light:border-neutral-200'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg font-bold font-display tracking-tight text-neutral-100 light:text-neutral-900 hover:text-amber-400 transition-colors whitespace-nowrap"
        >
          Sohail Shah Quadri
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400 light:text-neutral-600">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-neutral-100 light:hover:text-neutral-950 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-amber-400 hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-neutral-400 light:text-neutral-600 hover:text-neutral-200 light:hover:text-neutral-900 border border-neutral-800 light:border-neutral-300 rounded-md transition-colors bg-neutral-900/50 light:bg-neutral-100"
            title="Open command palette (Ctrl+K)"
            aria-label="Open command palette"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-mono text-[11px] text-neutral-400">⌘K</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 text-neutral-400 light:text-neutral-600 hover:text-neutral-200 light:hover:text-neutral-900 border border-neutral-800 light:border-neutral-300 rounded-md transition-colors bg-neutral-900/50 light:bg-neutral-100"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
          </button>

          {/* Admin Dashboard / Status */}
          <button
            onClick={onOpenAdmin}
            className={`p-1.5 border rounded-md transition-colors ${
              isAdmin
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                : 'border-neutral-800 light:border-neutral-300 text-neutral-400 light:text-neutral-600 hover:text-neutral-200 light:hover:text-neutral-900 bg-neutral-900/50 light:bg-neutral-100'
            }`}
            title={isAdmin ? `Admin active: ${user?.email}` : 'Admin portal'}
            aria-label="Admin portal"
          >
            {isAdmin ? <UserCheck className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          </button>

          {/* Resume CTA */}
          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-all shadow-sm active:scale-95 whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-neutral-400 light:text-neutral-600 hover:text-neutral-200 border border-neutral-800 light:border-neutral-300 rounded-md"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 light:border-neutral-200 bg-neutral-950/95 light:bg-white/95 backdrop-blur-lg px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-neutral-300 light:text-neutral-700 hover:text-amber-400 hover:bg-neutral-900 light:hover:bg-neutral-100 rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-neutral-800 light:border-neutral-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Download & View Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
