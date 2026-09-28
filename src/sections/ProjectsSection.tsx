import React, { useState, useEffect, useMemo } from 'react';
import { ExternalLink, Github, BookOpen, ArrowUpRight, Search, X, Filter } from 'lucide-react';
import { IProject } from '../types';
import { api } from '../services/api';

interface ProjectsSectionProps {
  onOpenCaseStudy: (project: IProject) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenCaseStudy }) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
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

  const filterOptions = [
    { id: 'All', label: 'All Projects' },
    { id: 'React', label: 'React / Next.js' },
    { id: 'DevOps', label: 'DevOps & Cloud' },
    { id: 'Mobile', label: 'Mobile' },
    { id: 'Full-Stack', label: 'Full-Stack' },
    { id: 'Fintech', label: 'Fintech' },
    { id: 'AI/ML', label: 'AI / ML' },
  ];

  // Helper function to test if a project matches a specific category/technology filter
  const matchesCategoryFilter = (p: IProject, category: string): boolean => {
    if (category === 'All') return true;

    const catLower = category.toLowerCase();
    const projectCategoryLower = p.category.toLowerCase();
    const techsLower = p.technologies.map((t) => t.toLowerCase());

    if (catLower === 'react') {
      return (
        projectCategoryLower.includes('react') ||
        techsLower.some((t) => t.includes('react') || t.includes('next.js')) ||
        p.title.toLowerCase().includes('react') ||
        p.description.toLowerCase().includes('react')
      );
    }

    if (catLower === 'devops') {
      return (
        projectCategoryLower.includes('cloud') ||
        projectCategoryLower.includes('devops') ||
        techsLower.some(
          (t) =>
            t.includes('aws') ||
            t.includes('docker') ||
            t.includes('devops') ||
            t.includes('ci/cd') ||
            t.includes('cloud') ||
            t.includes('fastapi')
        ) ||
        p.description.toLowerCase().includes('aws') ||
        p.description.toLowerCase().includes('docker') ||
        p.description.toLowerCase().includes('cloud') ||
        Boolean(p.caseStudy?.architecture?.toLowerCase().includes('aws'))
      );
    }

    if (catLower === 'mobile') {
      return (
        projectCategoryLower === 'mobile' ||
        techsLower.some((t) => t.includes('mobile') || t.includes('react native') || t.includes('flutter')) ||
        p.description.toLowerCase().includes('mobile') ||
        p.subtitle.toLowerCase().includes('mobile')
      );
    }

    if (catLower === 'full-stack') {
      return (
        projectCategoryLower === 'full-stack' ||
        (techsLower.some((t) => t.includes('node') || t.includes('express')) &&
          techsLower.some((t) => t.includes('react') || t.includes('next')))
      );
    }

    if (catLower === 'fintech') {
      return (
        projectCategoryLower === 'fintech' ||
        p.title.toLowerCase().includes('jetfyx') ||
        p.title.toLowerCase().includes('richesse') ||
        p.description.toLowerCase().includes('trading') ||
        p.description.toLowerCase().includes('fintech')
      );
    }

    if (catLower === 'ai/ml') {
      return (
        projectCategoryLower === 'ai/ml' ||
        techsLower.some((t) => t.includes('ai') || t.includes('machine learning') || t.includes('ml')) ||
        p.description.toLowerCase().includes('ai') ||
        p.description.toLowerCase().includes('machine learning')
      );
    }

    // Default exact category or tech match
    return (
      projectCategoryLower === catLower ||
      techsLower.some((t) => t.includes(catLower))
    );
  };

  // Count items for each filter option
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const opt of filterOptions) {
      map[opt.id] = projects.filter((p) => matchesCategoryFilter(p, opt.id)).length;
    }
    return map;
  }, [projects]);

  // Filter projects by both category and optional search query
  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = matchesCategoryFilter(p, selectedCategory);
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.problem.toLowerCase().includes(q) ||
        p.solution.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [projects, selectedCategory, searchQuery]);

  const handleSelectTech = (tech: string) => {
    // If clicking a tech tag that corresponds to a major category
    const lower = tech.toLowerCase();
    if (lower.includes('react native') || lower.includes('mobile')) {
      setSelectedCategory('Mobile');
    } else if (lower.includes('aws') || lower.includes('docker') || lower.includes('cloud')) {
      setSelectedCategory('DevOps');
    } else if (lower.includes('react') || lower.includes('next')) {
      setSelectedCategory('React');
    } else {
      setSearchQuery(tech);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-neutral-800/80 light:border-neutral-200 bg-neutral-950/40 light:bg-neutral-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 light:text-amber-800 font-semibold">
              03. Featured Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-neutral-100 light:text-neutral-900 mt-2 text-balance">
              Production Applications &amp; Case Studies
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 light:text-neutral-600 mt-2">
              End-to-end applications demonstrating high-concurrency client design, streaming protocols, resilient API microservices, and cloud deployments.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech or keyword..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-300 rounded-lg text-neutral-100 light:text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 p-0.5"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs with dynamic badge counts */}
        <div className="mt-8 flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900/60 light:bg-neutral-100 rounded-lg border border-neutral-800/80 light:border-neutral-200 w-fit">
          {filterOptions.map((opt) => {
            const isSelected = selectedCategory === opt.id;
            const count = counts[opt.id] ?? 0;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedCategory(opt.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-neutral-800 text-amber-400 light:bg-white light:text-neutral-900 shadow-sm font-semibold'
                    : 'text-neutral-400 light:text-neutral-600 hover:text-neutral-200 light:hover:text-neutral-900'
                }`}
              >
                <span>{opt.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isSelected
                      ? 'bg-amber-400/20 text-amber-300 light:bg-neutral-100 light:text-neutral-900 font-bold'
                      : 'text-neutral-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Filter Feedback & Reset */}
        {(selectedCategory !== 'All' || searchQuery.trim() !== '') && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-3.5 py-2 rounded-lg bg-neutral-900/40 light:bg-neutral-100/70 border border-neutral-800/60 light:border-neutral-200 text-xs">
            <div className="flex items-center gap-2 text-neutral-400 light:text-neutral-600">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>
                Showing <strong className="text-neutral-200 light:text-neutral-900 font-mono">{filtered.length}</strong> {filtered.length === 1 ? 'project' : 'projects'}
                {selectedCategory !== 'All' && (
                  <span> in <strong className="text-amber-400 font-medium">{filterOptions.find(o => o.id === selectedCategory)?.label || selectedCategory}</strong></span>
                )}
                {searchQuery.trim() && (
                  <span> matching &quot;<strong className="text-neutral-200 light:text-neutral-900">{searchQuery}</strong>&quot;</span>
                )}
              </span>
            </div>

            <button
              onClick={clearAllFilters}
              className="text-xs text-amber-400 hover:text-amber-300 light:text-amber-700 hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <X className="w-3 h-3" />
              <span>Reset all filters</span>
            </button>
          </div>
        )}

        {/* Projects Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-96 rounded-xl bg-neutral-900/40 animate-pulse border border-neutral-800" />
            ))
          ) : filtered.length === 0 ? (
            <div className="col-span-full py-16 text-center text-xs text-neutral-400 border border-dashed border-neutral-800 light:border-neutral-300 rounded-xl p-8 space-y-3">
              <p className="text-sm font-semibold text-neutral-200 light:text-neutral-800">
                No projects found matching the selected criteria.
              </p>
              <p className="text-neutral-500 max-w-sm mx-auto">
                Try selecting a different filter category like &quot;React&quot;, &quot;DevOps&quot;, or &quot;Mobile&quot;, or clear the search query.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors"
              >
                <span>View All Projects</span>
              </button>
            </div>
          ) : (
            filtered.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col rounded-xl overflow-hidden bg-neutral-900 light:bg-white border border-neutral-800/80 light:border-neutral-200 hover:border-amber-400/50 light:hover:border-amber-400 transition-all duration-200 shadow-sm"
              >
                {/* Visual Thumbnail */}
                <div
                  className="aspect-[16/10] overflow-hidden bg-neutral-950 relative cursor-pointer"
                  onClick={() => onOpenCaseStudy(project)}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />

                  {/* Category unboxed tag on image */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-neutral-950/80 text-neutral-200 backdrop-blur-sm border border-neutral-800">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-950 bg-amber-400 px-2.5 py-1 rounded shadow-md">
                      <span>Case Study</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3
                      onClick={() => onOpenCaseStudy(project)}
                      className="text-lg font-bold font-display text-neutral-100 light:text-neutral-900 group-hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs text-neutral-400 light:text-neutral-600 mt-1 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Problem / Solution preview snippet */}
                  <div className="p-2.5 rounded bg-neutral-950/60 light:bg-neutral-50 border border-neutral-800/60 light:border-neutral-200 text-[11px] text-neutral-400 light:text-neutral-600">
                    <span className="text-neutral-200 light:text-neutral-800 font-medium block">
                      Core Problem Solved:
                    </span>
                    <span className="line-clamp-2 mt-0.5">{project.problem}</span>
                  </div>

                  {/* Technologies (Clickable tags that activate filter) */}
                  <div className="pt-2 border-t border-neutral-800/60 light:border-neutral-100">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-neutral-400 light:text-neutral-600">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <span key={tech} className="inline-flex items-center">
                          <button
                            onClick={() => handleSelectTech(tech)}
                            className="hover:text-amber-400 hover:underline cursor-pointer transition-colors"
                            title={`Filter by ${tech}`}
                          >
                            {tech}
                          </button>
                          {idx < Math.min(project.technologies.length, 4) - 1 && (
                            <span className="text-neutral-600 ml-2">/</span>
                          )}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-amber-400 font-semibold cursor-pointer" onClick={() => onOpenCaseStudy(project)}>
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Link Bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-800/60 light:border-neutral-100 text-xs">
                    <button
                      onClick={() => onOpenCaseStudy(project)}
                      className="inline-flex items-center gap-1.5 font-medium text-amber-400 light:text-amber-700 hover:underline cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Case Study</span>
                    </button>

                    <div className="flex items-center gap-3 text-neutral-400 light:text-neutral-600">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="hover:text-amber-400 transition-colors p-1"
                          title="Live Demonstration"
                          aria-label={`Live demo of ${project.title}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="hover:text-amber-400 transition-colors p-1"
                        title="GitHub Repository"
                        aria-label={`GitHub repository for ${project.title}`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
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
