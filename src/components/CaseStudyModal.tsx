import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Layers, Target, CheckCircle2, TrendingUp, Cpu, Sparkles } from 'lucide-react';
import { IProject } from '../types';

interface CaseStudyModalProps {
  project: IProject | null;
  onClose: () => void;
  onOpenAIProject?: (project: IProject) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose, onOpenAIProject }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#0e131f] border border-slate-800/90 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-slate-100 transition-all max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-1">
              <span className="text-amber-400 font-medium">{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>Architecture Case Study</span>
              <span aria-hidden="true">·</span>
              <span>Sohail Shah</span>
            </div>
            <h2 className="text-2xl font-bold font-display tracking-tight text-slate-100">
              {project.title}
            </h2>
            <p className="text-sm text-slate-400 mt-0.5 font-sans">
              {project.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer border border-slate-800/60"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Featured Preview Visual */}
        <div className="mt-5 rounded-xl overflow-hidden border border-slate-800/80 aspect-video max-h-72 bg-slate-950 relative shadow-inner">
          <img
            src={project.image}
            alt={`${project.title} interface preview`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.includes('/src/assets/images/')) {
                target.src = target.src.replace('/src/assets/images/', '/images/');
                return;
              }
              if (!target.src.includes('hero_developer_workspace')) {
                target.src = '/images/hero_developer_workspace_1790605403219.jpg';
                return;
              }
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.classList.add('flex', 'items-center', 'justify-center', 'bg-slate-900');
                parent.innerHTML = `<div class="text-center p-6"><span class="text-slate-400 text-sm font-mono">${project.title} System Visual</span></div>`;
              }
            }}
          />
        </div>

        {/* Key Project Meta Bar */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs font-sans">
          <div>
            <span className="text-slate-400 block mb-1 font-medium font-mono">My Engineering Contribution</span>
            <p className="text-slate-200 leading-relaxed">{project.contribution}</p>
          </div>
          <div>
            <span className="text-slate-400 block mb-1 font-medium font-mono">Technologies Leveraged</span>
            <div className="flex flex-wrap gap-1.5 text-slate-300 font-mono">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-2.5 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-200 text-[11px]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Problem vs Solution */}
        <div className="mt-6 space-y-4">
          <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-950/10">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 mb-1.5">
              <Target className="w-4 h-4" />
              <span>The Engineering Challenge</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {project.problem}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/10">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Architectural Solution</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Architecture Topology */}
        {project.caseStudy?.architecture && (
          <div className="mt-6 p-4 rounded-xl border border-slate-800 bg-slate-950/70">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>System Topology &amp; Data Flow</span>
            </div>
            <div className="font-mono text-xs text-amber-300/90 bg-slate-900/90 p-3 rounded-lg border border-slate-800 overflow-x-auto whitespace-pre-wrap">
              {project.caseStudy.architecture}
            </div>
          </div>
        )}

        {/* Implementation Challenges */}
        {project.caseStudy?.challenges && project.caseStudy.challenges.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-3 font-mono">
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>Technical Hurdles &amp; Breakthroughs</span>
            </h3>
            <ul className="space-y-2 text-sm text-slate-300 font-sans">
              {project.caseStudy.challenges.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="font-mono text-xs text-amber-400 mt-0.5">0{i + 1}.</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Measurable Production Outcomes */}
        {project.caseStudy?.metrics && project.caseStudy.metrics.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-800">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-3 font-mono">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Production Verification &amp; Outcomes</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.caseStudy.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-slate-800 bg-slate-900/60 text-center"
                >
                  <span className="text-xs text-slate-200 font-medium font-sans">
                    {m}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-400/10 active:scale-95 cursor-pointer"
              >
                <span>{project.secondaryLiveUrl ? 'Trading Platform (Signup)' : 'Live Demonstration'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.secondaryLiveUrl && (
              <a
                href={project.secondaryLiveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-slate-200 bg-slate-900/90 hover:bg-slate-850 hover:text-white border border-slate-800 hover:border-slate-700 rounded-xl transition-all active:scale-95 cursor-pointer"
              >
                <span>Official Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {onOpenAIProject && (
              <button
                onClick={() => onOpenAIProject(project)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-amber-300 bg-amber-400/10 hover:bg-amber-400 hover:text-slate-950 border border-amber-400/35 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Ask AI Architecture</span>
              </button>
            )}

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer font-mono"
          >
            Close (ESC)
          </button>
        </div>
      </div>
    </div>
  );
};
