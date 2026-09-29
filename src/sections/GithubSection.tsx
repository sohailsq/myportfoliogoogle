import React, { useState, useEffect } from 'react';
import { Github, GitPullRequest, Star, GitFork, ExternalLink, Activity, Code } from 'lucide-react';
import { IGithubStats } from '../types';
import { api } from '../services/api';

export const GithubSection: React.FC = () => {
  const [stats, setStats] = useState<IGithubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await api.getGithubStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to load GitHub stats:', err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <section className="py-20 md:py-28 border-t border-slate-800/80 bg-[#080c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              06. Open Source &amp; Velocity
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-100 mt-2 text-balance">
              GitHub Engineering Footprint
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 font-sans">
              Public code repositories, active commit velocity, and language distribution across full-stack and mobile projects.
            </p>
          </div>

          <a
            href={stats?.profileUrl || 'https://github.com/mohammadsohailshahquadri14'}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors w-fit"
          >
            <Github className="w-4 h-4 text-amber-400" />
            <span>Visit @mohammadsohailshahquadri14</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Top Summary Metrics */}
        {stats && (
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs text-slate-400 block font-mono">Public Repos</span>
              <span className="text-2xl font-bold font-mono text-slate-100 mt-1 block tabular-nums">
                {stats.totalRepos}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs text-slate-400 block font-mono">Contributions</span>
              <span className="text-2xl font-bold font-mono text-amber-400 mt-1 block tabular-nums">
                {stats.totalContributionsLastYear}+
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs text-slate-400 block font-mono">Current Streak</span>
              <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block tabular-nums">
                {stats.streakDays} days
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs text-slate-400 block font-mono">Followers</span>
              <span className="text-2xl font-bold font-mono text-slate-100 mt-1 block tabular-nums">
                {stats.followers}
              </span>
            </div>
          </div>
        )}

        {/* Repositories & Language Breakdown */}
        {stats && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Recent Key Repos (Left 7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center gap-2">
                <GitPullRequest className="w-3.5 h-3.5 text-amber-400" />
                <span>Featured Open Source Projects</span>
              </h3>

              <div className="space-y-3">
                {stats.recentRepositories.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group block card-glow"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold font-mono text-slate-100 group-hover:text-amber-300 transition-colors">
                          {repo.name}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
                      </div>
                      <p className="text-xs text-slate-400 mt-1.5 font-sans leading-relaxed">
                        {repo.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-3 pt-2 border-t border-slate-800/60 text-[11px] font-mono text-slate-400">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        {repo.language}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400" />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3 text-slate-400" />
                        {repo.forks}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Language Distribution Breakdown (Right 5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-xl bg-slate-900/50 border border-slate-800 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span>Primary Language Distribution</span>
              </h3>

              {/* Progress stack bar */}
              <div className="h-3 rounded-full overflow-hidden flex bg-slate-950 border border-slate-800">
                {stats.primaryLanguages.map((lang) => (
                  <div
                    key={lang.name}
                    style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                    title={`${lang.name}: ${lang.percentage}%`}
                    className="h-full transition-all"
                  />
                ))}
              </div>

              {/* Legend list */}
              <div className="space-y-2 pt-2">
                {stats.primaryLanguages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                      <span className="text-slate-300 font-sans">{lang.name}</span>
                    </div>
                    <span className="font-mono text-slate-400">{lang.percentage}%</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
                Telemetry aggregated from public Git commit trees &amp; repositories.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
