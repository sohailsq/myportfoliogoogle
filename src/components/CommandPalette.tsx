import React, { useState, useEffect, useRef } from 'react';
import { Search, FileText, Moon, Sun, Lock, Mail, ExternalLink, Code2, Layers, Briefcase, Cpu, Terminal, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenAdmin: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onOpenAdmin,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useTheme();

  const [copiedNotice, setCopiedNotice] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open
          setQuery('');
          setSelectedIndex(0);
          setCopiedNotice(false);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
      setCopiedNotice(false);
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const items = [
    {
      id: 'sec-about',
      label: 'About Sohail Shah (Engineering Profile)',
      category: 'Navigation',
      icon: <Code2 className="w-4 h-4 text-amber-400" />,
      action: () => {
        window.location.hash = '#about';
        onClose();
      },
    },
    {
      id: 'sec-skills',
      label: 'Technical Skills & Stack (Languages, Frontend, Backend, Mobile, Cloud)',
      category: 'Navigation',
      icon: <Cpu className="w-4 h-4 text-blue-400" />,
      action: () => {
        window.location.hash = '#skills';
        onClose();
      },
    },
    {
      id: 'sec-projects',
      label: 'Featured Projects (JetFyx, Veedly, NexaDeutsch, Richesse)',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4 text-emerald-400" />,
      action: () => {
        window.location.hash = '#projects';
        onClose();
      },
    },
    {
      id: 'sec-experience',
      label: 'Professional Experience (Veedly, Metagen, Nafa Barter, Bitstek)',
      category: 'Navigation',
      icon: <Briefcase className="w-4 h-4 text-purple-400" />,
      action: () => {
        window.location.hash = '#experience';
        onClose();
      },
    },
    {
      id: 'sec-devops',
      label: 'DevOps & Cloud Pipeline ("From Code to Production")',
      category: 'Navigation',
      icon: <Terminal className="w-4 h-4 text-amber-400" />,
      action: () => {
        window.location.hash = '#devops';
        onClose();
      },
    },
    {
      id: 'sec-contact',
      label: 'Contact & Hire Sohail (Direct Form & Email)',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-pink-400" />,
      action: () => {
        window.location.hash = '#contact';
        onClose();
      },
    },
    {
      id: 'act-resume',
      label: 'Open Printable ATS Resume',
      category: 'Actions',
      icon: <FileText className="w-4 h-4 text-amber-400" />,
      action: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: 'act-admin',
      label: 'Open Admin Dashboard & CRUD Management',
      category: 'Actions',
      icon: <Lock className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onClose();
        onOpenAdmin();
      },
    },
    {
      id: 'act-theme',
      label: `Switch Theme to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      category: 'Actions',
      icon: theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />,
      action: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: 'act-copy-email',
      label: 'Copy Email Address (sohailshah14921@gmail.com)',
      category: 'Actions',
      icon: <Mail className="w-4 h-4 text-blue-400" />,
      action: () => {
        navigator.clipboard.writeText('sohailshah14921@gmail.com');
        setCopiedNotice(true);
        setTimeout(() => onClose(), 1200);
      },
    },
    {
      id: 'act-github',
      label: 'Open GitHub Profile (@mohammadsohailshahquadri14)',
      category: 'External',
      icon: <ExternalLink className="w-4 h-4 text-neutral-400" />,
      action: () => {
        const link = document.createElement('a');
        link.href = 'https://github.com/mohammadsohailshahquadri14';
        link.target = '_blank';
        link.rel = 'noreferrer noopener';
        link.click();
        onClose();
      },
    },
    {
      id: 'act-linkedin',
      label: 'Open LinkedIn Profile (mssq14)',
      category: 'External',
      icon: <ExternalLink className="w-4 h-4 text-neutral-400" />,
      action: () => {
        const link = document.createElement('a');
        link.href = 'https://linkedin.com/in/mssq14/';
        link.target = '_blank';
        link.rel = 'noreferrer noopener';
        link.click();
        onClose();
      },
    },
  ];

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-neutral-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-200 rounded-xl shadow-2xl overflow-hidden transition-all text-neutral-100 light:text-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-800 light:border-neutral-200">
          <Search className="w-4 h-4 text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or jump to section..."
            className="w-full bg-transparent text-sm text-neutral-100 light:text-neutral-900 placeholder:text-neutral-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block font-mono text-[10px] text-neutral-500 bg-neutral-800 light:bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-700 light:border-neutral-300">
            ESC
          </kbd>
        </div>

        {copiedNotice && (
          <div className="px-4 py-2 bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center justify-between">
            <span>✓ Email copied to clipboard: sohailshah14921@gmail.com</span>
          </div>
        )}

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-500">
              No matching commands or destinations found.
            </div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-amber-400/10 text-amber-300 light:bg-amber-50 light:text-amber-900 font-medium'
                      : 'text-neutral-300 light:text-neutral-700 hover:bg-neutral-800/60 light:hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-neutral-500">{item.category}</span>
                    {isSelected && <ArrowRight className="w-3.5 h-3.5 text-amber-400" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-neutral-800 light:border-neutral-200 bg-neutral-950/40 light:bg-neutral-50 flex items-center justify-between text-[11px] text-neutral-500">
          <span>Navigate with ↑ ↓ and press Enter</span>
          <span>Sohail Shah Quadri Portfolio</span>
        </div>
      </div>
    </div>
  );
};
