import React, { useState, useEffect } from 'react';
import { Cpu, Terminal, CheckCircle2, Search } from 'lucide-react';
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

  const categories = ['All', 'Frontend', 'Backend', 'DevOps & Cloud', 'Tools'];

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesQuery = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.highlight.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="skills" className="py-20 md:py-28 border-t border-neutral-800/80 light:border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 light:text-amber-800 font-semibold">
              02. Technical Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-neutral-100 light:text-neutral-900 mt-2 text-balance">
              Engineered Across the Modern Stack
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 light:text-neutral-600 mt-2">
              Comprehensive hands-on proficiency spanning client state management, server architectures, database modeling, and automated cloud infrastructure.
            </p>
          </div>

          {/* Search filter input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by skill or keyword..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-900 light:bg-neutral-100 border border-neutral-800 light:border-neutral-300 rounded-lg text-neutral-100 light:text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Interactive Segmented Filter Controls */}
        <div className="mt-8 flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900/60 light:bg-neutral-100 rounded-lg border border-neutral-800/80 light:border-neutral-200 w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-neutral-800 text-amber-400 light:bg-white light:text-neutral-900 shadow-sm font-semibold'
                  : 'text-neutral-400 light:text-neutral-600 hover:text-neutral-200 light:hover:text-neutral-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-xl bg-neutral-900/40 animate-pulse border border-neutral-800"
              />
            ))
          ) : filteredSkills.length === 0 ? (
            <div className="col-span-full py-12 text-center text-xs text-neutral-500 border border-dashed border-neutral-800 rounded-xl">
              No skills found matching &quot;{searchQuery}&quot; in {selectedCategory}.
            </div>
          ) : (
            filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="p-4 rounded-xl bg-neutral-900/50 light:bg-white border border-neutral-800/80 light:border-neutral-200 hover:border-amber-400/40 light:hover:border-amber-400 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-neutral-100 light:text-neutral-900 group-hover:text-amber-400 transition-colors">
                      {skill.name}
                    </h3>
                    {/* Zero-pill compliant unboxed text */}
                    <span className="text-[11px] font-mono text-neutral-400 light:text-neutral-600 shrink-0">
                      {skill.proficiency}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 light:text-neutral-600 mt-2 line-clamp-2 leading-relaxed">
                    {skill.highlight}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-neutral-800/50 light:border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 light:text-neutral-600 font-mono">
                  <span>{skill.category}</span>
                  <span className="tabular-nums">{skill.yearsOfExperience} yrs</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
