import React, { useState, useEffect } from 'react';
import { Cpu, Search, CheckCircle2, Terminal, Code2, Server, Smartphone, Database, Cloud, Wrench } from 'lucide-react';
import { ISkill } from '../types';
import { api } from '../services/api';

export const SkillsSection: React.FC = () => {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await api.getSkills();
        setSkills(data);
      } catch (err) {
        console.error('Error fetching skills:', err);
      } finally {
        setLoading(false);
      }
    };
    loadSkills();
  }, []);

  const categories = [
    'All',
    'Languages',
    'Frontend',
    'Backend',
    'Mobile',
    'Databases',
    'Cloud / DevOps',
    'Tools',
  ];

  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'languages':
        return <Code2 className="w-3.5 h-3.5 text-amber-400" />;
      case 'frontend':
        return <Cpu className="w-3.5 h-3.5 text-sky-400" />;
      case 'backend':
        return <Server className="w-3.5 h-3.5 text-indigo-400" />;
      case 'mobile':
        return <Smartphone className="w-3.5 h-3.5 text-emerald-400" />;
      case 'databases':
        return <Database className="w-3.5 h-3.5 text-rose-400" />;
      case 'cloud / devops':
      case 'devops & cloud':
        return <Cloud className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <Wrench className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      skill.category.toLowerCase() === selectedCategory.toLowerCase() ||
      (selectedCategory === 'Cloud / DevOps' && skill.category.toLowerCase().includes('devops'));

    const query = searchQuery.toLowerCase();
    const matchesQuery =
      skill.name.toLowerCase().includes(query) ||
      skill.highlight.toLowerCase().includes(query) ||
      skill.category.toLowerCase().includes(query);

    return matchesCategory && matchesQuery;
  });

  return (
    <section id="skills" className="py-20 md:py-28 border-t border-slate-800/80 bg-[#080c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              02. Technical Proficiencies
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-100 mt-2 text-balance">
              Core Technologies &amp; Tooling
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 font-sans">
              Verified hands-on expertise spanning modern web frameworks, mobile SDKs, server architecture, database modeling, and automated cloud workflows.
            </p>
          </div>

          {/* Search filter input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900/80 border border-slate-800 focus:border-amber-400/80 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/50 rounded-lg border border-slate-800/80 w-fit">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-xl bg-slate-900/40 animate-pulse border border-slate-800/80"
              />
            ))
          ) : filteredSkills.length === 0 ? (
            <div className="col-span-full py-12 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl font-mono">
              No skills found matching &quot;{searchQuery}&quot; in {selectedCategory}.
            </div>
          ) : (
            filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all card-glow flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-sm font-semibold text-slate-100 font-display group-hover:text-amber-300 transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700/60 shrink-0">
                      {skill.proficiency}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-sans">
                    {skill.highlight}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                  {getCategoryIcon(skill.category)}
                  <span>{skill.category}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
