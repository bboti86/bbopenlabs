import { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { AppShowcaseCard } from './components/AppShowcaseCard';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { type FilterValue, LabIntroBar } from './components/LabIntroBar';
import { TechnologiesSection } from './components/TechnologiesSection';
import { type AppEntry, curatedApps, labProfile } from './data/catalog';
import { loadShowcaseCatalog } from './lib/github';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = window.localStorage.getItem('bb-open-labs-theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isIntroExpanded, setIsIntroExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedHistoryIds, setExpandedHistoryIds] = useState<Record<string, boolean>>({});
  const [apps, setApps] = useState<AppEntry[]>(curatedApps);
  const [syncMode, setSyncMode] = useState<'github-live' | 'curated-fallback'>('curated-fallback');
  const [isSyncing, setIsSyncing] = useState<boolean>(true);
  const [syncNotice, setSyncNotice] = useState<string | undefined>(undefined);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    root.style.colorScheme = isDark ? 'dark' : 'light';
    window.localStorage.setItem('bb-open-labs-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const syncFromGitHub = useCallback(async (signal?: AbortSignal, forceRefresh = false) => {
    setIsSyncing(true);
    try {
      const result = await loadShowcaseCatalog(labProfile.githubUsername, signal, forceRefresh);
      setApps(result.apps);
      setSyncMode(result.mode);
      setSyncNotice(result.notice);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return;
      }
      setApps(curatedApps);
      setSyncMode('curated-fallback');
      setSyncNotice('Showing curated lab catalog.');
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void syncFromGitHub(controller.signal);
    return () => controller.abort();
  }, [syncFromGitHub]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredApps = apps.filter((app) => {
    const matchesPlatform =
      activeFilter === 'all' || app.platform === activeFilter;

    if (!matchesPlatform) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchableFields = [
      app.name,
      app.repoName,
      app.primaryLanguage,
      ...app.techStack,
      app.summary,
    ];

    return searchableFields.some((field) =>
      field.toLowerCase().includes(normalizedQuery),
    );
  });

  const handleToggleHistory = (appId: string) => {
    setExpandedHistoryIds((prev) => ({
      ...prev,
      [appId]: !prev[appId],
    }));
  };

  const handleJumpToApp = (appId: string) => {
    const targetApp = apps.find((item) => item.id === appId);
    if (targetApp && activeFilter !== 'all' && targetApp.platform !== activeFilter) {
      setActiveFilter('all');
    }
    if (searchQuery) {
      setSearchQuery('');
    }
    requestAnimationFrame(() => {
      const element = document.getElementById(appId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const totalReleases = apps.reduce((sum, app) => sum + app.versions.length, 0);

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)]">
      <Header
        onSelectPlatformFromNav={(platform) => {
          setActiveFilter(platform);
        }}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />

      <LabIntroBar
        isExpanded={isIntroExpanded}
        onToggleExpand={() => setIsIntroExpanded((prev) => !prev)}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        apps={apps}
        onJumpToApp={handleJumpToApp}
        syncMode={syncMode}
        isSyncing={isSyncing}
        syncNotice={syncNotice}
        onRefreshGitHub={() => void syncFromGitHub(undefined, true)}
      />

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pt-12 pb-8 border-b border-[var(--color-hairline)]">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-medium text-[var(--color-muted)]">
                BB Open Labs · @{labProfile.githubUsername} · Open-Source Releases
              </p>
              <h1 className="mt-3 font-display text-4xl sm:text-5xl font-medium tracking-tight text-[var(--color-ink)] leading-[1.1]">
                Focused Android utilities and offline-first Web PWAs.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-muted)]">
                Every application listed below includes a concise functionality summary, a complete version release history, and direct access to its open-source repository on GitHub.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-4">
              <div className="rounded-xl border border-[var(--color-hairline)] bg-[#F8F9FB] px-5 py-3.5">
                <img
                  src={labProfile.logoUrl}
                  alt="BB Open Labs circuit monogram"
                  className="h-16 w-auto object-contain"
                />
              </div>
              <div className="flex items-center gap-3 text-xs text-[var(--color-muted)]">
                <span className="font-mono tabular-nums">
                  {apps.length} {apps.length === 1 ? 'Application' : 'Applications'}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">
                  {totalReleases} Releases
                </span>
              </div>
              <a
                href={labProfile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-text)] hover:underline underline-offset-4"
              >
                <span>Browse all repositories on GitHub</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section id="catalog" aria-labelledby="catalog-heading" className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-5 border-b border-[var(--color-hairline)] pt-8 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2
                id="catalog-heading"
                className="font-display text-2xl font-medium tracking-tight text-[var(--color-ink)]"
              >
                {activeFilter === 'all'
                  ? 'Application Catalog'
                  : activeFilter === 'android'
                    ? 'Android Applications'
                    : 'Web Progressive Apps'}
              </h2>

              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-muted)]">
                <span>
                  {syncMode === 'github-live'
                    ? `Live GitHub repositories (@${labProfile.githubUsername})`
                    : 'Structured catalog'}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">
                  Showing {filteredApps.length} of {apps.length}
                </span>
                {syncNotice && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{syncNotice}</span>
                  </>
                )}
              </div>
            </div>

            <div className="w-full md:w-80 lg:w-96">
              <label htmlFor="catalog-search" className="sr-only">
                Filter applications by name or key technology
              </label>
              <div className="relative flex items-center">
                <Search
                  className="pointer-events-none absolute left-3.5 h-4 w-4 text-[var(--color-muted)]"
                  aria-hidden="true"
                />
                <input
                  id="catalog-search"
                  type="text"
                  inputMode="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape' && searchQuery) {
                      setSearchQuery('');
                    }
                  }}
                  placeholder="Filter by app name or technology…"
                  className="w-full rounded-lg border border-[var(--color-hairline)] bg-[var(--color-surface)] py-2.5 pl-10 pr-9 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/75 focus:border-[var(--color-brand)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]/20 transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search filter"
                    className="absolute right-2.5 rounded p-1 text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {isSyncing && apps.length === 0 ? (
            <div className="py-16 text-sm text-[var(--color-muted)]">
              Loading repositories from GitHub…
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="my-8 rounded-xl border border-[var(--color-hairline)] bg-[var(--color-limestone)]/50 p-10 text-center">
              <p className="font-display text-xl font-medium text-[var(--color-ink)]">
                {normalizedQuery
                  ? `No applications match “${searchQuery.trim()}”.`
                  : `No ${activeFilter === 'android' ? 'Android' : 'Web PWA'} applications match this filter.`}
              </p>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Try searching for another app name or technology (such as Kotlin, Java, Flutter, or JavaScript), or reset your filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                }}
                className="mt-5 inline-flex items-center rounded-md bg-[var(--color-brand)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)] transition-colors cursor-pointer"
              >
                {normalizedQuery ? 'Reset Search & Filters' : 'Show All Applications'}
              </button>
            </div>
          ) : (
            <div>
              {filteredApps.map((app, index) => (
                <AppShowcaseCard
                  key={app.id}
                  app={app}
                  index={index}
                  isHistoryExpanded={Boolean(expandedHistoryIds[app.id])}
                  onToggleHistory={handleToggleHistory}
                />
              ))}
            </div>
          )}
        </section>

        <TechnologiesSection />
      </main>

      <Footer />
    </div>
  );
}
