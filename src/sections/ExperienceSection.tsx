import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, GraduationCap, Building2, Sparkles, LayoutList, Columns } from 'lucide-react';
import { IExperience } from '../types';
import { api } from '../services/api';

// Canonical experience data array without Metagen Technologies
const DEFAULT_EXPERIENCE: IExperience[] = [
  {
    id: 'exp-veedly',
    company: 'Veedly',
    position: 'Software Developer',
    location: 'Hyderabad, Telangana, India',
    period: 'Current',
    startDate: '2025-01-01',
    isCurrent: true,
    type: 'Full-time',
    description: [
      'Develop and maintain web and mobile applications for the Veedly platform using Next.js, JavaScript, HTML, CSS, and Flutter.',
      'Build reusable UI components and responsive layouts across screen sizes and devices; integrate REST APIs and dynamic application data.',
      'Debug frontend, API, UI, and application-level issues, and contribute across development, testing, deployment, usability, and performance improvements.',
      'Collaborate with product and business stakeholders to translate requirements into working features; also support vendor research and identification for platform operations.'
    ],
    technologies: ['Next.js', 'JavaScript', 'Flutter', 'HTML5', 'CSS3', 'REST APIs'],
    highlights: [
      'Built reusable UI components and responsive layouts across varied screen sizes and devices',
      'Integrated REST APIs and dynamic application data for core platform workflows',
      'Supported vendor research, identification, and technical improvements for platform operations'
    ],
    order: 1,
  },
  {
    id: 'exp-nafa',
    company: 'Nafa Barter',
    position: 'Frontend Developer',
    location: 'Hyderabad, Telangana, India',
    period: 'May 2025 – April 2026',
    startDate: '2025-05-01',
    endDate: '2026-04-30',
    isCurrent: false,
    type: 'Full-time',
    description: [
      'Developed interactive frontend functionality for JetFyx, a trading platform, using modern JavaScript development practices.',
      'Built reusable responsive components, integrated APIs, handled asynchronous data, and worked with application state management.',
      'Debugged frontend issues and collaborated with the development team to deliver features, improve reliability, and enhance user experience.'
    ],
    technologies: ['React.js', 'React Native', 'JavaScript', 'WebSockets', 'REST APIs', 'State Management'],
    highlights: [
      'Developed interactive frontend functionality for the JetFyx trading platform',
      'Handled asynchronous real-time streaming data and complex application state management',
      'Improved platform reliability and user experience through collaborative feature development'
    ],
    order: 2,
  },
  {
    id: 'exp-bitstek',
    company: 'Bitstek Consulting',
    position: 'Software Engineer Intern',
    location: 'Hyderabad, Telangana, India',
    period: 'September 2024 – April 2025 (8 Months)',
    startDate: '2024-09-01',
    endDate: '2025-04-30',
    isCurrent: false,
    type: 'Full-time',
    description: [
      'Completed an 8-month software engineering internship contributing to real-world CRM applications and the Howzdat mobile application.',
      'Developed responsive frontend features using React.js, JavaScript, HTML, and CSS; integrated APIs and dynamic application data.',
      'Debugged application issues with senior developers, collaborated through feature development and testing, and used Git-based source-control workflows.'
    ],
    technologies: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'REST APIs', 'Git'],
    highlights: [
      'Contributed to real-world CRM applications and the Howzdat mobile application',
      'Developed responsive frontend features and integrated dynamic application data',
      'Collaborated closely with senior developers on debugging, testing, and Git workflows'
    ],
    order: 3,
  },
  {
    id: 'exp-education',
    company: 'Deccan College of Engineering and Technology',
    position: 'Bachelor of Engineering - Computer Science',
    location: 'Hyderabad, Telangana, India',
    period: '2021 – 2025',
    startDate: '2021-08-01',
    endDate: '2025-06-30',
    isCurrent: false,
    type: 'Education',
    description: [
      'Comprehensive study of Computer Science principles, Data Structures, Algorithms, Database Management Systems, Operating Systems, Computer Networks, and Software Engineering.',
      'Developed SmartSync as a college final project: a MERN-based medical tracking application with an integrated LLaMA-based AI model.',
      'Educational background includes Narayana Junior College (Intermediate - 88%) and St. Francis Grammar High School (Secondary School - 9.2 GPA).'
    ],
    technologies: ['Computer Science', 'Data Structures', 'Algorithms', 'MERN Stack', 'AI (LLaMA)'],
    highlights: [
      'Bachelor of Engineering in Computer Science (2021 - 2025)',
      'Intermediate: Narayana Junior College (88%)',
      'Secondary School: St. Francis Grammar High School (9.2 GPA)'
    ],
    order: 4,
  }
];

export const ExperienceSection: React.FC = () => {
  const [experiences, setExperiences] = useState<IExperience[]>(DEFAULT_EXPERIENCE);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'timeline' | 'compact'>('timeline');

  useEffect(() => {
    const loadExp = async () => {
      try {
        const data = await api.getExperience();
        if (data && data.length > 0) {
          // Explicitly filter out Metagen Technologies to guarantee clean data
          const sanitized = data.filter(
            (item) => !item.company.toLowerCase().includes('metagen')
          );
          setExperiences(sanitized.length > 0 ? sanitized : DEFAULT_EXPERIENCE);
        }
      } catch (err) {
        console.error('Error fetching experience, using clean defaults:', err);
        setExperiences(DEFAULT_EXPERIENCE);
      } finally {
        setLoading(false);
      }
    };
    loadExp();
  }, []);

  return (
    <section id="experience" className="py-20 md:py-28 border-t border-slate-800/80 bg-[#080c14]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              04. Professional History
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-100 mt-2 text-balance">
              Work History &amp; Engineering Roles
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 font-sans">
              Demonstrated track record building production web and mobile platforms, trading systems, and cloud infrastructure.
            </p>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-900/80 border border-slate-800 rounded-lg shrink-0">
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>Timeline</span>
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === 'compact'
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Compact</span>
            </button>
          </div>
        </div>

        {/* Timeline Layout */}
        <div className="mt-14">
          {loading ? (
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-44 rounded-xl bg-slate-900/40 animate-pulse border border-slate-800/60"
                />
              ))}
            </div>
          ) : viewMode === 'timeline' ? (
            /* Vertical Connected Timeline */
            <div className="relative pl-6 sm:pl-10 space-y-10 border-l border-slate-800/90 ml-3 sm:ml-4">
              {experiences.map((exp, index) => {
                const isEdu = exp.type === 'Education';
                return (
                  <div key={exp.id} className="relative group">
                    {/* Glowing Timeline Marker Node */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                        exp.isCurrent
                          ? 'bg-amber-400/20 border-amber-400 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.35)]'
                          : isEdu
                          ? 'bg-indigo-500/10 border-indigo-400 text-indigo-400'
                          : 'bg-slate-900 border-slate-700 text-slate-400 group-hover:border-amber-400/60 group-hover:text-amber-400'
                      }`}
                    >
                      {exp.isCurrent ? (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      ) : isEdu ? (
                        <GraduationCap className="w-3 h-3" />
                      ) : (
                        <Building2 className="w-3 h-3" />
                      )}
                    </div>

                    {/* Experience Card */}
                    <div className="p-6 sm:p-7 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all card-glow">
                      {/* Top Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800/80 pb-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg sm:text-xl font-bold font-display text-slate-100">
                              {exp.position}
                            </h3>
                            <span className="text-amber-400 font-display font-semibold text-base sm:text-lg">
                              @ {exp.company}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-400 font-mono mt-1.5">
                            <span className="flex items-center gap-1 text-slate-300">
                              <Calendar className="w-3.5 h-3.5 text-amber-400" />
                              {exp.period}
                            </span>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-500" />
                              {exp.location}
                            </span>
                          </div>
                        </div>

                        {/* Status Badges */}
                        <div className="flex items-center gap-2 shrink-0">
                          {exp.isCurrent ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium border border-emerald-500/20 shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                              Active Role
                            </span>
                          ) : (
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                              {isEdu ? 'Education' : 'Completed'}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Responsibilities Bullets */}
                      <div className="mt-4 space-y-2.5">
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                          {exp.description.map((desc, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{desc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Engineering Highlights */}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-slate-800/80">
                          <span className="text-[11px] uppercase tracking-wider font-mono font-semibold text-amber-400 flex items-center gap-1.5 mb-2.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            Key Contributions
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {exp.highlights.map((h, i) => (
                              <div
                                key={i}
                                className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300 text-xs flex items-start gap-2"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                                <span className="leading-snug">{h}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Technologies Deployed */}
                      <div className="mt-4 pt-3.5 border-t border-slate-800/60 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-mono text-slate-400 mr-1.5">Stack:</span>
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-slate-800/70 text-slate-200 border border-slate-700/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Compact Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experiences.map((exp) => {
                const isEdu = exp.type === 'Education';
                return (
                  <div
                    key={exp.id}
                    className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5">
                          {isEdu ? (
                            <GraduationCap className="w-4 h-4 text-indigo-400" />
                          ) : (
                            <Building2 className="w-4 h-4 text-amber-400" />
                          )}
                          <span className="text-sm font-bold font-display text-slate-100">
                            {exp.company}
                          </span>
                        </div>
                        {exp.isCurrent ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Active
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-400">
                            {exp.period}
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs font-semibold text-amber-300 font-mono">
                        {exp.position}
                      </h4>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed font-sans">
                        {exp.description[0]}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1">
                      {exp.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
