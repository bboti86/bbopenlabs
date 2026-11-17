import { useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp, Globe, Smartphone } from 'lucide-react';
import type { AppEntry } from '../data/catalog';

interface AppShowcaseCardProps {
  app: AppEntry;
  index: number;
  isHistoryExpanded: boolean;
  onToggleHistory: (appId: string) => void;
}

export function AppShowcaseCard({
  app,
  index,
  isHistoryExpanded,
  onToggleHistory,
}: AppShowcaseCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasOnlyFallbackMainVersion =
    app.versions.length === 1 && app.versions[0]?.version === 'main';
  const [historyTab, setHistoryTab] = useState<'versions' | 'commits'>(
    hasOnlyFallbackMainVersion && app.commits.length > 0 ? 'commits' : 'versions',
  );
  const [commitsExpanded, setCommitsExpanded] = useState(false);

  const latestVersion = app.versions[0];
  const visibleVersions = isHistoryExpanded ? app.versions : app.versions.slice(0, 1);
  const olderCount = Math.max(0, app.versions.length - 1);
  const visibleCommits = commitsExpanded ? app.commits : app.commits.slice(0, 3);
  const hiddenCommitCount = Math.max(0, app.commits.length - 3);

  return (
    <article
      id={app.id}
      className="scroll-mt-24 border-b border-[var(--color-hairline)] py-12 first:pt-8 last:border-b-0"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-xl border border-[var(--color-hairline)] bg-[var(--color-limestone)] aspect-[4/3]">
            {app.previewImage && !imageFailed ? (
              <img
                src={app.previewImage}
                alt={app.previewAlt || `${app.name} showcase preview`}
                referrerPolicy="no-referrer"
                onError={() => setImageFailed(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col justify-between p-6 bg-gradient-to-br from-[var(--color-limestone)] via-[var(--color-paper)] to-[var(--color-brand-tint)]">
                <div className="flex items-center justify-between text-xs text-[var(--color-muted)]">
                  <span className="font-mono tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>
                    {app.platform === 'android' ? 'Android Application' : 'Web Progressive App'}
                  </span>
                </div>

                <div className="my-auto py-4">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-hairline)] bg-[var(--color-paper)] text-[var(--color-brand-text)]">
                    {app.platform === 'android' ? (
                      <Smartphone className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Globe className="h-5 w-5" aria-hidden="true" />
                    )}
                  </div>
                  <p className="font-display text-2xl font-medium text-[var(--color-ink)]">
                    {app.name}
                  </p>
                  <p className="mt-1 font-mono text-xs text-[var(--color-muted)]">
                    {app.repoName}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-[var(--color-hairline)] pt-3 text-xs text-[var(--color-muted)]">
                  <span>{app.primaryLanguage}</span>
                  <span className="font-mono tabular-nums">
                    {latestVersion ? latestVersion.version : 'main'}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[var(--color-muted)]">
            <span className="font-mono tabular-nums">
              Fig. {String(index + 1).padStart(2, '0')}
            </span>
            <span aria-hidden="true">·</span>
            <span>{app.techStack.join(' / ')}</span>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[var(--color-muted)]">
              <span className="font-semibold text-[var(--color-brand-text)]">
                {app.platform === 'android' ? 'Android App' : 'Web PWA'}
              </span>
              <span aria-hidden="true">·</span>
              <span>{app.primaryLanguage}</span>
              <span aria-hidden="true">·</span>
              <span>{app.license} License</span>
              {latestVersion && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    Latest {latestVersion.version}
                  </span>
                </>
              )}
              {typeof app.stars === 'number' && app.stars > 0 && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{app.stars} GitHub stars</span>
                </>
              )}
            </div>

            <h3 className="mt-2 font-display text-3xl font-medium tracking-tight text-[var(--color-ink)]">
              {app.name}
            </h3>

            <p className="mt-3 max-w-prose text-base leading-relaxed text-[var(--color-muted)]">
              {app.summary}
            </p>
          </div>

          <div className="border-t border-[var(--color-hairline)] pt-5">
            <h4 className="text-xs font-semibold tracking-wide text-[var(--color-ink)]">
              Functionality Summary
            </h4>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--color-muted)]">
              {app.functionalityHighlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs text-[var(--color-brand-text)] shrink-0 mt-0.5"
                  >
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <a
              href={app.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-[var(--color-brand)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]"
            >
              <span>View on GitHub</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>

            {app.liveOrDownloadUrl && (
              <a
                href={app.liveOrDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-ink)] hover:text-[var(--color-brand-text)] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                <span>{app.liveOrDownloadLabel || 'Releases & Source'}</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>

          <div className="rounded-lg border border-[var(--color-hairline)] bg-[var(--color-limestone)]/45 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div
                role="tablist"
                aria-label={`${app.name} history view`}
                className="inline-flex items-center gap-1 rounded-md border border-[var(--color-hairline)] bg-[var(--color-paper)] p-1"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={historyTab === 'versions'}
                  onClick={() => setHistoryTab('versions')}
                  className={`rounded px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    historyTab === 'versions'
                      ? 'bg-[var(--color-brand)] text-white'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                  }`}
                >
                  Version History ({app.versions.length})
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={historyTab === 'commits'}
                  onClick={() => setHistoryTab('commits')}
                  className={`rounded px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    historyTab === 'commits'
                      ? 'bg-[var(--color-brand)] text-white'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                  }`}
                >
                  Development Commits ({app.commits.length})
                </button>
              </div>

              {historyTab === 'versions' && olderCount > 0 && (
                <button
                  type="button"
                  onClick={() => onToggleHistory(app.id)}
                  aria-expanded={isHistoryExpanded}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-brand-text)] hover:underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>
                    {isHistoryExpanded
                      ? 'Hide earlier versions'
                      : `Show all ${app.versions.length} versions`}
                  </span>
                  {isHistoryExpanded ? (
                    <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                </button>
              )}

              {historyTab === 'commits' && hiddenCommitCount > 0 && (
                <button
                  type="button"
                  onClick={() => setCommitsExpanded((prev) => !prev)}
                  aria-expanded={commitsExpanded}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-brand-text)] hover:underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>
                    {commitsExpanded
                      ? 'Show fewer commits'
                      : `Show all ${app.commits.length} commits`}
                  </span>
                  {commitsExpanded ? (
                    <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                </button>
              )}
            </div>

            {historyTab === 'versions' ? (
              <ol className="mt-4 divide-y divide-[var(--color-hairline)]">
                {visibleVersions.map((release) => (
                  <li key={`${app.id}-${release.version}`} className="py-3.5 first:pt-1 last:pb-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="flex flex-wrap items-baseline gap-2.5">
                        <span className="font-mono text-xs font-medium tabular-nums text-[var(--color-brand-text)]">
                          {release.version}
                        </span>
                        <span className="text-sm font-semibold text-[var(--color-ink)]">
                          {release.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <time
                          dateTime={release.date}
                          className="font-mono text-xs tabular-nums text-[var(--color-muted)]"
                        >
                          {release.date}
                        </time>
                        {release.releaseUrl && (
                          <a
                            href={release.releaseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-[var(--color-brand-text)] hover:underline underline-offset-4"
                          >
                            Notes
                          </a>
                        )}
                      </div>
                    </div>

                    <ul className="mt-2 space-y-1 text-xs leading-relaxed text-[var(--color-muted)]">
                      {release.changes.map((change, changeIdx) => (
                        <li key={changeIdx} className="flex items-start gap-2">
                          <span aria-hidden="true" className="text-[var(--color-muted)]">
                            —
                          </span>
                          <span>{change}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            ) : app.commits.length === 0 ? (
              <p className="mt-4 text-xs leading-relaxed text-[var(--color-muted)]">
                No commit history is available for this entry right now. Check the repository directly on GitHub for the full git log.
              </p>
            ) : (
              <ol className="mt-4 divide-y divide-[var(--color-hairline)]">
                {visibleCommits.map((commit) => (
                  <li key={`${app.id}-${commit.sha}`} className="py-3.5 first:pt-1 last:pb-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="flex flex-wrap items-baseline gap-2.5 min-w-0">
                        <span className="font-mono text-xs font-medium tabular-nums text-[var(--color-brand-text)] shrink-0">
                          {commit.sha}
                        </span>
                        <span className="text-sm font-semibold text-[var(--color-ink)]">
                          {commit.headline}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {commit.date && (
                          <time
                            dateTime={commit.date}
                            className="font-mono text-xs tabular-nums text-[var(--color-muted)]"
                          >
                            {commit.date}
                          </time>
                        )}
                        {commit.commitUrl && (
                          <a
                            href={commit.commitUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-[var(--color-brand-text)] hover:underline underline-offset-4"
                          >
                            Commit
                          </a>
                        )}
                      </div>
                    </div>

                    {commit.details && (
                      <p className="mt-1.5 whitespace-pre-line text-xs leading-relaxed text-[var(--color-muted)]">
                        {commit.details}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
