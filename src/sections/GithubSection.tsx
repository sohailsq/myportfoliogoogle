import React, { useState, useEffect } from 'react';
import { Github, GitPullRequest, Star, GitFork, ExternalLink, Activity } from 'lucide-react';
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
    <section className="py-20 md:py-28 border-t border-neutral-800/80 light:border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 light:text-amber-800 font-semibold">
              06. Open Source &amp; Code Velocity
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-neutral-100 light:text-neutral-900 mt-2 text-balance">
              GitHub Engineering Footprint
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 light:text-neutral-600 mt-2">
              Public repositories, active development velocity, and language distribution across open-source work.
            </p>
          </div>

          <a
            href={stats?.profileUrl || 'https://github.com/mohammadsohailshahquadri14'}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-neutral-300 light:text-neutral-700 bg-neutral-900 light:bg-neutral-100 hover:bg-neutral-800 border border-neutral-800 light:border-neutral-300 rounded-md transition-colors w-fit"
          >
            <Github className="w-4 h-4" />
            <span>Visit @mohammadsohailshahquadri14 on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Top Summary Metrics */}
        {stats && (
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-neutral-900/50 light:bg-white border border-neutral-800/80 light:border-neutral-200">
              <span className="text-xs text-neutral-400 block font-mono">Public Repos</span>
              <span className="text-2xl font-bold font-mono text-neutral-100 light:text-neutral-900 mt-1 block tabular-nums">
                {stats.totalRepos}
              </span>
              <span className="text-[11px] text-neutral-500 mt-0.5 block">Active codebases</span>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/50 light:bg-white border border-neutral-800/80 light:border-neutral-200">
              <span className="text-xs text-neutral-400 block font-mono">Contributions</span>
              <span className="text-2xl font-bold font-mono text-amber-400 light:text-amber-700 mt-1 block tabular-nums">
                {stats.totalContributionsLastYear}+
              </span>
              <span className="text-[11px] text-neutral-500 mt-0.5 block">Past 12 months</span>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/50 light:bg-white border border-neutral-800/80 light:border-neutral-200">
              <span className="text-xs text-neutral-400 block font-mono">Commit Streak</span>
              <span className="text-2xl font-bold font-mono text-emerald-400 light:text-emerald-700 mt-1 block tabular-nums">
                {stats.streakDays} Days
              </span>
              <span className="text-[11px] text-neutral-500 mt-0.5 block">Continuous shipping</span>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/50 light:bg-white border border-neutral-800/80 light:border-neutral-200">
              <span className="text-xs text-neutral-400 block font-mono">Followers</span>
              <span className="text-2xl font-bold font-mono text-blue-400 light:text-blue-700 mt-1 block tabular-nums">
                {stats.followers}
              </span>
              <span className="text-[11px] text-neutral-500 mt-0.5 block">Developer community</span>
            </div>
          </div>
        )}

        {/* Language Breakdown Bar */}
        {stats && (
          <div className="mt-6 p-5 rounded-xl bg-neutral-900/40 light:bg-white border border-neutral-800/80 light:border-neutral-200 space-y-3">
            <span className="text-xs font-semibold text-neutral-200 light:text-neutral-800 block">
              Most Used Languages
            </span>
            <div className="h-3 w-full rounded-full overflow-hidden flex bg-neutral-950">
              {stats.primaryLanguages.map((lang) => (
                <div
                  key={lang.name}
                  style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 light:text-neutral-600">
              {stats.primaryLanguages.map((lang) => (
                <div key={lang.name} className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span>{lang.name}</span>
                  <span className="text-neutral-500">({lang.percentage}%)</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Public Repositories */}
        {stats && stats.recentRepositories && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.recentRepositories.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noreferrer noopener"
                className="p-5 rounded-xl bg-neutral-900/60 light:bg-white border border-neutral-800/80 light:border-neutral-200 hover:border-amber-400/50 light:hover:border-amber-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-semibold font-mono text-neutral-100 light:text-neutral-900 group-hover:text-amber-400 transition-colors">
                      {repo.name}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-400" />
                  </div>
                  <p className="text-xs text-neutral-400 light:text-neutral-600 mt-2 line-clamp-2 leading-relaxed">
                    {repo.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/50 light:border-neutral-100 flex items-center justify-between text-xs text-neutral-400 light:text-neutral-600 font-mono">
                  <span className="text-amber-400">{repo.language}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-neutral-500" />
                      <span>{repo.stars}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3 text-neutral-500" />
                      <span>{repo.forks}</span>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
