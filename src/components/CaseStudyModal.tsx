import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Layers, Target, CheckCircle2, TrendingUp, Cpu } from 'lucide-react';
import { IProject } from '../types';

interface CaseStudyModalProps {
  project: IProject | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-200 rounded-xl shadow-2xl p-6 sm:p-8 my-8 text-neutral-100 light:text-neutral-900 transition-all max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-800 light:border-neutral-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-400 light:text-neutral-600 mb-1">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>Case Study</span>
              <span aria-hidden="true">·</span>
              <span>By Sohail Shah Quadri</span>
            </div>
            <h2 className="text-2xl font-bold font-display tracking-tight text-neutral-100 light:text-neutral-900">
              {project.title}
            </h2>
            <p className="text-sm text-neutral-400 light:text-neutral-600 mt-0.5">
              {project.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 light:text-neutral-500 light:hover:text-neutral-900 rounded-md hover:bg-neutral-800 light:hover:bg-neutral-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Featured Preview Visual */}
        <div className="mt-5 rounded-lg overflow-hidden border border-neutral-800 light:border-neutral-200 aspect-video max-h-72 bg-neutral-950 relative">
          <img
            src={project.image}
            alt={`${project.title} interface preview`}
            className="w-full h-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Zero-broken-image fallback container
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.classList.add('flex', 'items-center', 'justify-center', 'bg-neutral-900');
                parent.innerHTML = `<div class="text-center p-6"><span class="text-neutral-400 text-sm font-mono">${project.title} System Visual</span></div>`;
              }
            }}
          />
        </div>

        {/* Key Project Meta Bar */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-neutral-950/60 light:bg-neutral-50 border border-neutral-800/60 light:border-neutral-200 text-xs">
          <div>
            <span className="text-neutral-400 light:text-neutral-600 block mb-1 font-medium">My Engineering Contribution</span>
            <p className="text-neutral-200 light:text-neutral-800">{project.contribution}</p>
          </div>
          <div>
            <span className="text-neutral-400 light:text-neutral-600 block mb-1 font-medium">Technologies Leveraged</span>
            <div className="flex flex-wrap gap-1.5 text-neutral-300 light:text-neutral-700">
              {project.technologies.map((tech, idx) => (
                <span key={tech}>
                  {tech}
                  {idx < project.technologies.length - 1 && <span className="text-neutral-600 ml-1.5">·</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Problem vs Solution */}
        <div className="mt-6 space-y-4">
          <div className="p-4 rounded-lg border border-red-500/20 bg-red-950/10 light:bg-red-50/50">
            <div className="flex items-center gap-2 text-xs font-semibold text-red-400 light:text-red-700 mb-1.5">
              <Target className="w-4 h-4" />
              <span>The Engineering Challenge</span>
            </div>
            <p className="text-sm text-neutral-300 light:text-neutral-700 leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-950/10 light:bg-emerald-50/50">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 light:text-emerald-700 mb-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Architectural Solution</span>
            </div>
            <p className="text-sm text-neutral-300 light:text-neutral-700 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Architecture Topology */}
        {project.caseStudy?.architecture && (
          <div className="mt-6 p-4 rounded-lg border border-neutral-800 light:border-neutral-200 bg-neutral-950/50 light:bg-neutral-50">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300 light:text-neutral-800 mb-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>System Topology & Data Flow</span>
            </div>
            <div className="font-mono text-xs text-neutral-400 light:text-neutral-600 bg-neutral-900 light:bg-white p-3 rounded border border-neutral-800 light:border-neutral-200 overflow-x-auto whitespace-pre-wrap">
              {project.caseStudy.architecture}
            </div>
          </div>
        )}

        {/* Critical Implementation Challenges */}
        {project.caseStudy?.challenges && project.caseStudy.challenges.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 light:text-neutral-600 flex items-center gap-2 mb-3">
              <Cpu className="w-4 h-4 text-neutral-400" />
              <span>Technical Hurdles & Breakthroughs</span>
            </h3>
            <ul className="space-y-2 text-sm text-neutral-300 light:text-neutral-700">
              {project.caseStudy.challenges.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="font-mono text-xs text-amber-400 mt-1">0{i + 1}.</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Measurable Production Outcomes */}
        {project.caseStudy?.metrics && project.caseStudy.metrics.length > 0 && (
          <div className="mt-6 pt-5 border-t border-neutral-800 light:border-neutral-200">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 light:text-neutral-600 flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Production Verification & Outcomes</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.caseStudy.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-neutral-800/80 light:border-neutral-200 bg-neutral-950/40 light:bg-neutral-100 text-center"
                >
                  <span className="text-xs text-neutral-300 light:text-neutral-800 font-medium">
                    {m}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 pt-5 border-t border-neutral-800 light:border-neutral-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors"
              >
                <span>Live Demonstration</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-neutral-300 light:text-neutral-700 bg-neutral-800 light:bg-neutral-100 hover:bg-neutral-700 light:hover:bg-neutral-200 rounded-md transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>View Source Code</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="text-xs text-neutral-400 light:text-neutral-600 hover:text-neutral-200 transition-colors"
          >
            Close Window (ESC)
          </button>
        </div>
      </div>
    </div>
  );
};
