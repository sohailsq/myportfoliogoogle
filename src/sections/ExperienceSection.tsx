import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, GraduationCap } from 'lucide-react';
import { IExperience } from '../types';
import { api } from '../services/api';

export const ExperienceSection: React.FC = () => {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTabId, setActiveTabId] = useState<string>('');

  useEffect(() => {
    const loadExp = async () => {
      try {
        const data = await api.getExperience();
        setExperiences(data);
        if (data.length > 0) setActiveTabId(data[0].id);
      } catch (err) {
        console.error('Error fetching experience:', err);
      } finally {
        setLoading(false);
      }
    };
    loadExp();
  }, []);

  const activeExp = experiences.find((e) => e.id === activeTabId) || experiences[0];

  return (
    <section id="experience" className="py-20 md:py-28 border-t border-neutral-800/80 light:border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 light:text-amber-800 font-semibold">
            04. Career &amp; Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-neutral-100 light:text-neutral-900 mt-2 text-balance">
            Work History &amp; Engineering Roles
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 light:text-neutral-600 mt-2">
            Professional track record delivering client systems, trading engines, and scalable frontend architectures.
          </p>
        </div>

        {/* Master-Detail Interactive Timeline Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Company / Role Selector Navigation (Left 4 cols) */}
          <div className="lg:col-span-4 space-y-1.5 border-l-2 border-neutral-800 light:border-neutral-200 pl-2">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-16 rounded-lg bg-neutral-900/40 animate-pulse" />
              ))
            ) : (
              experiences.map((exp) => {
                const isSelected = exp.id === activeExp?.id;
                return (
                  <button
                    key={exp.id}
                    onClick={() => setActiveTabId(exp.id)}
                    className={`w-full text-left p-3.5 rounded-lg transition-all text-xs flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900 light:bg-neutral-100 border-l-2 border-amber-400 font-semibold text-neutral-100 light:text-neutral-900 -ml-[10px] pl-[18px]'
                        : 'text-neutral-400 light:text-neutral-600 hover:text-neutral-200 hover:bg-neutral-900/40'
                    }`}
                  >
                    <div>
                      <span className="block text-sm font-semibold">{exp.company}</span>
                      <span className="block text-[11px] font-mono text-neutral-400 light:text-neutral-500 mt-0.5">
                        {exp.position}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'text-amber-400 translate-x-1' : 'opacity-0'
                      }`}
                    />
                  </button>
                );
              })
            )}
          </div>

          {/* Detailed Experience Viewer (Right 8 cols) */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-xl bg-neutral-900/60 light:bg-white border border-neutral-800/80 light:border-neutral-200">
            {activeExp && (
              <div className="space-y-6">
                {/* Title & Metadata */}
                <div className="border-b border-neutral-800/80 light:border-neutral-200 pb-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold font-display text-neutral-100 light:text-neutral-900">
                        {activeExp.position}{' '}
                        <span className="text-amber-400 light:text-amber-700">@ {activeExp.company}</span>
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 light:text-neutral-600 font-mono mt-1.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {activeExp.period}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {activeExp.location}
                        </span>
                        <span>·</span>
                        <span>{activeExp.type}</span>
                      </div>
                    </div>

                    {activeExp.isCurrent && (
                      <span className="self-start px-2.5 py-1 rounded text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                        Current Role
                      </span>
                    )}
                  </div>
                </div>

                {/* Key Responsibilities */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 light:text-neutral-600 mb-3">
                    Key Engineering Responsibilities:
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300 light:text-neutral-700 leading-relaxed">
                    {activeExp.description.map((desc, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Measurable Highlights */}
                {activeExp.highlights && activeExp.highlights.length > 0 && (
                  <div className="p-4 rounded-lg bg-neutral-950/60 light:bg-neutral-50 border border-neutral-800/80 light:border-neutral-200">
                    <span className="text-xs font-semibold text-neutral-200 light:text-neutral-800 block mb-2">
                      Key Outcomes &amp; Impact:
                    </span>
                    <div className="space-y-1.5">
                      {activeExp.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-neutral-300 light:text-neutral-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies used */}
                <div className="pt-2">
                  <span className="text-xs font-mono text-neutral-400 light:text-neutral-600 block mb-2">
                    Technologies in this role:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeExp.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs font-mono rounded bg-neutral-800 light:bg-neutral-100 text-neutral-300 light:text-neutral-800 border border-neutral-700/60 light:border-neutral-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
