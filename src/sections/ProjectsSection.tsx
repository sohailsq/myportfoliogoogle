import React, { useState, useEffect, useMemo } from 'react';
import { ExternalLink, Github, BookOpen, ArrowUpRight, Search, X, Filter, Sparkles, Bot } from 'lucide-react';
import { IProject } from '../types';
import { api } from '../services/api';

interface ProjectsSectionProps {
  onOpenCaseStudy: (project: IProject) => void;
  onOpenAIProject?: (project: IProject) => void;
  onOpenAIAssistant?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenCaseStudy,
  onOpenAIProject,
  onOpenAIAssistant,
}) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await api.getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const filterTabs = [
    { label: 'All Projects', value: 'All' },
    { label: 'React', value: 'React' },
    { label: 'DevOps', value: 'DevOps' },
    { label: 'Mobile', value: 'Mobile' },
    { label: 'Full-Stack', value: 'Full-Stack' },
    { label: 'Fintech', value: 'Fintech' },
  ];

  const matchesCategoryFilter = (p: IProject, cat: string): boolean => {
    if (cat === 'All') return true;
    const catLower = cat.toLowerCase();
    const projectCategoryLower = p.category.toLowerCase();
    const techsLower = p.technologies.map((t) => t.toLowerCase());

    if (catLower === 'react') {
      return (
        techsLower.some((t) => t.includes('react')) ||
        p.title.toLowerCase().includes('react') ||
        p.description.toLowerCase().includes('react')
      );
    }

    if (catLower === 'devops') {
      const arch = p.caseStudy?.architecture?.toLowerCase() || '';
      return (
        projectCategoryLower.includes('cloud') ||
        projectCategoryLower.includes('devops') ||
        techsLower.some(
          (t) =>
            t.includes('aws') ||
            t.includes('docker') ||
            t.includes('ci/cd') ||
            t.includes('jenkins') ||
            t.includes('terraform') ||
            t.includes('cloud')
        ) ||
        arch.includes('aws') ||
        arch.includes('cloud')
      );
    }

    if (catLower === 'mobile') {
      return (
        projectCategoryLower.includes('mobile') ||
        techsLower.some(
          (t) =>
            t.includes('mobile') ||
            t.includes('react native') ||
            t.includes('flutter') ||
            t.includes('expo')
        )
      );
    }

    return (
      projectCategoryLower.includes(catLower) ||
      techsLower.some((t) => t.includes(catLower))
    );
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = matchesCategoryFilter(p, selectedCategory);
      const matchTech =
        !selectedTech ||
        p.technologies.some((t) => t.toLowerCase() === selectedTech.toLowerCase());

      const query = searchQuery.trim().toLowerCase();
      const matchQuery =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.technologies.some((t) => t.toLowerCase().includes(query)) ||
        p.category.toLowerCase().includes(query) ||
        p.problem.toLowerCase().includes(query) ||
        p.solution.toLowerCase().includes(query);

      return matchCat && matchTech && matchQuery;
    });
  }, [projects, selectedCategory, selectedTech, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const tab of filterTabs) {
      counts[tab.value] = projects.filter((p) => matchesCategoryFilter(p, tab.value)).length;
    }
    return counts;
  }, [projects]);

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedTech(null);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedTech !== null || searchQuery !== '';

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-slate-800/80 bg-[#090d16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              03. Featured Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-100 mt-2 text-balance">
              Production Applications &amp; Case Studies
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 font-sans">
              Real-world systems engineered across web, mobile, and cloud environments with end-to-end architecture breakdowns.
            </p>
          </div>

          {/* Search & AI Actions Box */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
            {onOpenAIAssistant && (
              <button
                onClick={onOpenAIAssistant}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-amber-400/10 hover:bg-amber-400 text-amber-300 hover:text-slate-950 border border-amber-400/40 transition-all cursor-pointer whitespace-nowrap shadow-sm"
                title="Open AI Career & Architecture Assistant"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Architecture Inspector</span>
              </button>
            )}

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name, stack..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-slate-900/80 border border-slate-800 focus:border-amber-400/80 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/50 rounded-lg border border-slate-800/80">
            {filterTabs.map((tab) => {
              const count = categoryCounts[tab.value] ?? 0;
              const isSelected = selectedCategory === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setSelectedCategory(tab.value)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-amber-500/30 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Filter Bar & Reset */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 text-xs">
              {selectedTech && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/30 font-mono text-[11px]">
                  <span>Tech: {selectedTech}</span>
                  <button onClick={() => setSelectedTech(null)} className="hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-amber-400 text-xs font-mono transition-colors"
              >
                <span>Reset all filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Project Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-96 rounded-xl bg-slate-900/40 animate-pulse border border-slate-800/80"
              />
            ))
          ) : filteredProjects.length === 0 ? (
            <div className="col-span-full py-16 text-center border border-dashed border-slate-800 rounded-xl bg-slate-900/20">
              <Filter className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <p className="text-sm text-slate-300 font-display">No matching projects found</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No projects matched your criteria. Try switching categories or clearing search keywords.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-4 px-4 py-2 text-xs font-semibold bg-amber-400 text-slate-950 rounded-lg hover:bg-amber-300 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between overflow-hidden card-glow"
              >
                <div>
                  {/* Image / Thumbnail Container */}
                  <div className="relative h-48 overflow-hidden bg-slate-950 border-b border-slate-800/80">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d131f] via-transparent to-transparent opacity-80" />

                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#080c14]/90 text-amber-400 border border-amber-400/30 backdrop-blur-md font-semibold">
                        {project.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {project.secondaryLiveUrl && (
                        <a
                          href={project.secondaryLiveUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="px-2 py-1 rounded bg-[#080c14]/85 hover:bg-amber-400 hover:text-slate-950 text-slate-300 border border-slate-700/60 transition-all flex items-center gap-1 text-[10px] font-mono backdrop-blur-md"
                          title="Open official site (jetfyx.com)"
                        >
                          <span>Site</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="px-2 py-1 rounded bg-[#080c14]/85 hover:bg-amber-400 hover:text-slate-950 text-slate-300 border border-slate-700/60 transition-all flex items-center gap-1 text-[10px] font-mono backdrop-blur-md"
                          title={project.secondaryLiveUrl ? 'Open Trading App / Signup' : 'Open live website'}
                        >
                          <span>{project.secondaryLiveUrl ? 'App' : 'Live'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    {/* AI Architecture Insight Trigger */}
                    {onOpenAIProject && (
                      <button
                        onClick={() => onOpenAIProject(project)}
                        className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#080c14]/90 hover:bg-amber-400 text-amber-300 hover:text-slate-950 border border-amber-400/40 text-[10px] font-mono font-semibold backdrop-blur-md transition-all cursor-pointer shadow-md"
                        title={`Ask Gemini AI about ${project.title} architecture`}
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Ask AI</span>
                      </button>
                    )}
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-lg font-bold font-display text-slate-100 group-hover:text-amber-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-sans">
                      {project.description}
                    </p>

                    {/* Tech Badges (Clickable) */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technologies.map((t) => {
                        const isTechSelected = selectedTech?.toLowerCase() === t.toLowerCase();
                        return (
                          <button
                            key={t}
                            onClick={() => setSelectedTech(isTechSelected ? null : t)}
                            className={`text-[11px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                              isTechSelected
                                ? 'bg-amber-400 text-slate-950 border-amber-400 font-semibold'
                                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/60'
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                  <button
                    onClick={() => onOpenCaseStudy(project)}
                    className="inline-flex items-center gap-1.5 font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer font-sans"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {onOpenAIProject && (
                      <button
                        onClick={() => onOpenAIProject(project)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-400/10 hover:bg-amber-400 text-amber-300 hover:text-slate-950 border border-amber-400/30 text-[11px] font-mono font-medium transition-all cursor-pointer"
                        title="Ask AI questions about this architecture"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Ask AI</span>
                      </button>
                    )}

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="p-1.5 text-slate-400 hover:text-slate-200 transition-colors"
                      title="View GitHub repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
