import React from 'react';
import { ArrowUpRight, Github, Instagram, Linkedin } from 'lucide-react';

const socialProfiles = [
  {
    name: 'GitHub',
    detail: 'Projects & code',
    href: 'https://github.com/sohailsq',
    icon: Github,
    iconClass: 'text-slate-300 group-hover:text-white',
    arrowClass: 'group-hover:text-white',
    glow: 'rgba(226, 232, 240, 0.85)',
  },
  {
    name: 'LinkedIn',
    detail: 'Professional network',
    href: 'https://linkedin.com/in/mssq14',
    icon: Linkedin,
    iconClass: 'text-sky-400 group-hover:text-sky-300',
    arrowClass: 'group-hover:text-sky-300',
    glow: 'rgba(56, 189, 248, 0.9)',
  },
  {
    name: 'Instagram',
    detail: 'More from my world',
    href: 'https://www.instagram.com/sohail_shah_quadri_/',
    icon: Instagram,
    iconClass: 'text-pink-400 group-hover:text-pink-300',
    arrowClass: 'group-hover:text-pink-300',
    glow: 'rgba(244, 114, 182, 0.9)',
  },
];

export const SocialGlowCards: React.FC = () => {
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    for (const card of event.currentTarget.querySelectorAll<HTMLElement>('.social-glow-card')) {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">Find me online</span>
        <p className="text-xs text-slate-500 mt-0.5">Follow my work and connect with me.</p>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3" onPointerMove={handlePointerMove}>
        {socialProfiles.map(({ name, detail, href, icon: Icon, iconClass, arrowClass, glow }) => (
          <a
            key={name}
            className="social-glow-card group"
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${name}: ${detail}`}
            style={{ '--glow-color': glow } as React.CSSProperties}
          >
            <div className="social-glow-card__surface">
              <div className="social-glow-card__content">
                <Icon className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors ${iconClass}`} />
                <div className="flex items-end justify-between w-full gap-1">
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-100 truncate">{name}</h3>
                    <p className="hidden sm:block text-[10px] text-slate-400 mt-0.5 truncate">{detail}</p>
                  </div>
                  <ArrowUpRight className={`w-3.5 h-3.5 shrink-0 text-slate-500 transition-colors ${arrowClass}`} />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
