import { ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { type AppEntry, type PlatformType, labProfile } from '../data/catalog';

export type FilterValue = 'all' | PlatformType;

interface LabIntroBarProps {
  isExpanded: boolean;
  onToggleExpand: () => void;
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
  apps: AppEntry[];
  onJumpToApp: (appId: string) => void;
  syncMode: 'github-live' | 'curated-fallback';
  isSyncing: boolean;
  syncNotice?: string;
  onRefreshGitHub: () => void;
}

export function LabIntroBar({
  isExpanded,
  onToggleExpand,
  activeFilter,
  onFilterChange,
  apps,
  onJumpToApp,
  syncMode,
  isSyncing,
  syncNotice,
  onRefreshGitHub,
}: LabIntroBarProps) {
  const androidCount = apps.filter((app) => app.platform === 'android').length;
  const pwaCount = apps.filter((app) => app.platform === 'pwa').length;

  return (
    <section
      aria-label="Lab introduction and catalog controls"
      className="border-b border-[var(--color-hairline)] bg-[var(--color-limestone)]/65"
    >
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4 min-w-0">
            <button
              type="button"
              onClick={onToggleExpand}
              aria-expanded={isExpanded}
              aria-controls="lab-intro-drawer"
              className="inline-flex items-center gap-2 self-start rounded-md border border-[var(--color-hairline)] bg-[var(--color-paper)] px-3.5 py-2 text-xs font-semibold text-[var(--color-ink)] hover:border-[var(--color-ink)]/40 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{isExpanded ? 'Close Lab Intro' : 'About BB Open Labs'}</span>
              {isExpanded ? (
                <ChevronUp className="h-3.5 w-3.5 text-[var(--color-muted)]" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 text-[var(--color-muted)]" aria-hidden="true" />
              )}
            </button>

            <p className="text-sm text-[var(--color-muted)] leading-snug">
              {labProfile.shortIntro}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div
              role="group"
              aria-label="Filter applications by platform"
              className="inline-flex items-center gap-1 rounded-lg border border-[var(--color-hairline)] bg-[var(--color-paper)] p-1"
            >
              <button
                type="button"
                onClick={() => onFilterChange('all')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-[var(--color-brand)] text-white'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                }`}
              >
                All Apps ({apps.length})
              </button>
              <button
                type="button"
                onClick={() => onFilterChange('android')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeFilter === 'android'
                    ? 'bg-[var(--color-brand)] text-white'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                }`}
              >
                Android ({androidCount})
              </button>
              <button
                type="button"
                onClick={() => onFilterChange('pwa')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeFilter === 'pwa'
                    ? 'bg-[var(--color-brand)] text-white'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                }`}
              >
                Web PWA ({pwaCount})
              </button>
            </div>

            <button
              type="button"
              onClick={onRefreshGitHub}
              disabled={isSyncing}
              title={`Sync repositories from github.com/${labProfile.githubUsername}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-hairline)] bg-[var(--color-paper)] px-3 py-2 text-xs font-medium text-[var(--color-muted)] hover:text-[var(--color-ink)] disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin' : ''}`}
                aria-hidden="true"
              />
              <span>{isSyncing ? 'Syncing…' : 'Sync GitHub'}</span>
            </button>
          </div>
        </div>

        {isExpanded && (
          <div
            id="lab-intro-drawer"
            className="mt-5 border-t border-[var(--color-hairline)] pt-6 pb-2"
          >
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7 space-y-4">
                <h2 className="font-display text-2xl font-medium tracking-tight text-[var(--color-ink)]">
                  Independent Open-Source Software, Built in the Open
                </h2>
                <div className="max-w-prose space-y-3 text-sm leading-relaxed text-[var(--color-muted)]">
                  {labProfile.expandedBio.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  <p className="text-[var(--color-ink)] font-medium">
                    {labProfile.aiGenerationNote}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs text-[var(--color-muted)]">
                  <span>Maintainer: @{labProfile.githubUsername}</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    Catalog Source:{' '}
                    {syncMode === 'github-live'
                      ? `Live GitHub API (@${labProfile.githubUsername})`
                      : 'Structured TypeScript Catalog'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Antigravity-Portable</span>
                </div>

                {syncNotice && (
                  <p className="text-xs text-[var(--color-muted)]">
                    Note: {syncNotice}
                  </p>
                )}
              </div>

              <div className="lg:col-span-5 border-t border-[var(--color-hairline)] pt-5 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="font-display text-base font-medium text-[var(--color-ink)]">
                    Quick-Jump Index
                  </h3>
                  <span className="font-mono text-xs tabular-nums text-[var(--color-muted)]">
                    {apps.length} entries
                  </span>
                </div>

                <ul className="divide-y divide-[var(--color-hairline)]">
                  {apps.map((app, index) => {
                    const latest = app.versions[0];
                    return (
                      <li key={app.id} className="py-2.5">
                        <button
                          type="button"
                          onClick={() => onJumpToApp(app.id)}
                          className="group flex w-full items-baseline justify-between gap-4 text-left cursor-pointer"
                        >
                          <span className="text-sm font-medium text-[var(--color-ink)] group-hover:text-[var(--color-brand-text)] group-hover:underline underline-offset-4 transition-colors truncate">
                            <span className="font-mono text-xs tabular-nums text-[var(--color-muted)] mr-2">
                              {String(index + 1).padStart(2, '0')}.
                            </span>
                            {app.name}
                          </span>
                          <span className="font-mono text-xs tabular-nums text-[var(--color-muted)] whitespace-nowrap shrink-0">
                            {app.platform === 'android' ? 'Android' : 'Web PWA'} ·{' '}
                            {latest ? latest.version : 'main'}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
