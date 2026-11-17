import {
  type AppCommit,
  type AppEntry,
  type AppVersion,
  type PlatformType,
  curatedApps,
} from '../data/catalog';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  license?: {
    spdx_id?: string | null;
    name?: string | null;
  } | null;
}

interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string | null;
  body: string | null;
  published_at: string;
  created_at: string;
  html_url: string;
  draft: boolean;
}

interface GitHubTag {
  name: string;
  commit: {
    sha: string;
  };
}

interface GitHubCommitItem {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author?: {
      name?: string;
      date?: string;
    } | null;
  };
}

export interface GitHubSyncResult {
  apps: AppEntry[];
  mode: 'github-live' | 'curated-fallback';
  repoCount: number;
  syncedAt: string;
  notice?: string;
}

function inferPlatform(repo: GitHubRepo): PlatformType {
  const haystack = [
    repo.name,
    repo.description ?? '',
    repo.language ?? '',
    ...(repo.topics ?? []),
  ]
    .join(' ')
    .toLowerCase();

  if (
    haystack.includes('android') ||
    haystack.includes('kotlin') ||
    haystack.includes('java') ||
    haystack.includes('flutter') ||
    haystack.includes('dart') ||
    haystack.includes('react-native') ||
    haystack.includes('apk')
  ) {
    return 'android';
  }

  return 'pwa';
}

function parseReleaseNotes(body: string | null): string[] {
  if (!body || !body.trim()) {
    return ['Published repository release on GitHub.'];
  }

  const lines = body
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-*•\d.)\s]+/, '').trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'));

  return lines.slice(0, 4).length > 0
    ? lines.slice(0, 4)
    : ['Published repository release on GitHub.'];
}

function formatRepoTitle(name: string): string {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

async function fetchRepoVersions(
  username: string,
  repo: GitHubRepo,
  signal?: AbortSignal,
): Promise<AppVersion[]> {
  const headers = {
    Accept: 'application/vnd.github+json',
  };

  try {
    const releasesRes = await fetch(
      `https://api.github.com/repos/${encodeURIComponent(username)}/${encodeURIComponent(repo.name)}/releases?per_page=8`,
      { headers, signal },
    );

    if (releasesRes.ok) {
      const releases = (await releasesRes.json()) as GitHubRelease[];
      const published = releases.filter((r) => !r.draft);
      if (published.length > 0) {
        return published.map((release) => ({
          version: release.tag_name,
          date: (release.published_at || release.created_at).slice(0, 10),
          title: release.name?.trim() || `Release ${release.tag_name}`,
          changes: parseReleaseNotes(release.body),
          releaseUrl: release.html_url,
        }));
      }
    }

    const tagsRes = await fetch(
      `https://api.github.com/repos/${encodeURIComponent(username)}/${encodeURIComponent(repo.name)}/tags?per_page=6`,
      { headers, signal },
    );

    if (tagsRes.ok) {
      const tags = (await tagsRes.json()) as GitHubTag[];
      if (tags.length > 0) {
        return tags.map((tag, index) => ({
          version: tag.name,
          date: repo.pushed_at.slice(0, 10),
          title: index === 0 ? 'Latest Tagged Revision' : 'Tagged Revision',
          changes: [`Git tag ${tag.name} (${tag.commit.sha.slice(0, 7)}) on GitHub.`],
          releaseUrl: `${repo.html_url}/releases/tag/${encodeURIComponent(tag.name)}`,
        }));
      }
    }
  } catch {
    // Fall back to repository snapshot entry below
  }

  return [
    {
      version: 'main',
      date: (repo.pushed_at || repo.updated_at).slice(0, 10),
      title: 'Active Repository Branch',
      changes: [
        repo.description?.trim() ||
          'Source repository maintained on GitHub without formal tagged releases yet.',
      ],
      releaseUrl: repo.html_url,
    },
  ];
}

function parseCommitMessage(message: string): { headline: string; details?: string } {
  const normalized = message.replace(/\r\n/g, '\n').trim();
  const [firstLine, ...rest] = normalized.split('\n');
  const details = rest.join('\n').trim();
  return {
    headline: firstLine?.trim() || 'Repository commit',
    details: details.length > 0 ? details : undefined,
  };
}

async function fetchRepoCommits(
  username: string,
  repoName: string,
  signal?: AbortSignal,
): Promise<AppCommit[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${encodeURIComponent(username)}/${encodeURIComponent(repoName)}/commits?per_page=10`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
        },
        signal,
      },
    );

    if (!res.ok) {
      return [];
    }

    const items = (await res.json()) as GitHubCommitItem[];
    return items.map((item) => {
      const parsed = parseCommitMessage(item.commit.message);
      return {
        sha: item.sha.slice(0, 7),
        date: item.commit.author?.date ? item.commit.author.date.slice(0, 10) : '',
        headline: parsed.headline,
        details: parsed.details,
        author: item.commit.author?.name,
        commitUrl: item.html_url,
      };
    });
  } catch {
    return [];
  }
}

export async function loadShowcaseCatalog(
  username: string,
  signal?: AbortSignal,
): Promise<GitHubSyncResult> {
  const cleanUsername = username.trim();
  const nowIso = new Date().toISOString();

  if (!cleanUsername) {
    return {
      apps: curatedApps,
      mode: 'curated-fallback',
      repoCount: curatedApps.length,
      syncedAt: nowIso,
    };
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(cleanUsername)}/repos?sort=updated&per_page=18`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
        },
        signal,
      },
    );

    if (!response.ok) {
      const reason =
        response.status === 403
          ? 'GitHub API rate limit reached; showing curated catalog entries.'
          : response.status === 404
            ? `GitHub user "${cleanUsername}" was not found; showing curated catalog entries.`
            : `GitHub API returned ${response.status}; showing curated catalog entries.`;

      return {
        apps: curatedApps,
        mode: 'curated-fallback',
        repoCount: curatedApps.length,
        syncedAt: nowIso,
        notice: reason,
      };
    }

    const repos = (await response.json()) as GitHubRepo[];
    const publicRepos = repos.filter((repo) => !repo.archived && !repo.fork).slice(0, 8);

    if (publicRepos.length === 0) {
      return {
        apps: curatedApps,
        mode: 'curated-fallback',
        repoCount: curatedApps.length,
        syncedAt: nowIso,
        notice: `No public non-fork repositories found for @${cleanUsername} yet; showing curated lab catalog.`,
      };
    }

    const curatedByRepo = new Map(
      curatedApps.map((app) => [app.repoName.toLowerCase(), app]),
    );

    const hydratedApps = await Promise.all(
      publicRepos.map(async (repo): Promise<AppEntry> => {
        const curatedMatch = curatedByRepo.get(repo.name.toLowerCase());
        const [versions, commits] = await Promise.all([
          fetchRepoVersions(cleanUsername, repo, signal),
          fetchRepoCommits(cleanUsername, repo.name, signal),
        ]);
        const platform = curatedMatch?.platform ?? inferPlatform(repo);
        const license =
          repo.license?.spdx_id && repo.license.spdx_id !== 'NOASSERTION'
            ? repo.license.spdx_id
            : curatedMatch?.license ?? 'Open Source';

        const stack = Array.from(
          new Set(
            [
              repo.language,
              ...(repo.topics ?? []).slice(0, 4),
              ...(curatedMatch?.techStack ?? []),
            ].filter((item): item is string => Boolean(item && item.trim())),
          ),
        );

        const highlights =
          curatedMatch?.functionalityHighlights ??
          [
            repo.description?.trim() ||
              `Open-source ${platform === 'android' ? 'Android' : 'Web PWA'} application maintained by @${cleanUsername}.`,
            repo.homepage
              ? `Includes a live deployment or documentation page at ${repo.homepage}.`
              : `Full source code, commit history, and issue tracker hosted on GitHub.`,
          ];

        return {
          id: curatedMatch?.id ?? repo.name.toLowerCase().replace(/[^a-z0-9-]+/g, '-'),
          name: curatedMatch?.name ?? formatRepoTitle(repo.name),
          repoName: repo.name,
          platform,
          license,
          primaryLanguage: repo.language ?? curatedMatch?.primaryLanguage ?? 'TypeScript',
          summary:
            repo.description?.trim() ||
            curatedMatch?.summary ||
            `Open-source ${platform === 'android' ? 'Android application' : 'Progressive Web App'} from BB Open Labs.`,
          functionalityHighlights: highlights,
          techStack: stack.length > 0 ? stack : [platform === 'android' ? 'Kotlin' : 'JavaScript'],
          githubUrl: repo.html_url,
          liveOrDownloadUrl: repo.homepage?.trim() || `${repo.html_url}/releases`,
          liveOrDownloadLabel: repo.homepage?.trim() ? 'Live App / Docs' : 'Releases on GitHub',
          previewImage: curatedMatch?.previewImage,
          previewAlt: curatedMatch?.previewAlt ?? `${repo.name} repository preview`,
          stars: repo.stargazers_count,
          updatedAt: repo.pushed_at.slice(0, 10),
          source: 'github',
          versions:
            versions.length === 1 && versions[0].version === 'main' && curatedMatch
              ? curatedMatch.versions
              : versions,
          commits: commits.length > 0 ? commits : curatedMatch?.commits ?? [],
        };
      }),
    );

    return {
      apps: hydratedApps,
      mode: 'github-live',
      repoCount: hydratedApps.length,
      syncedAt: nowIso,
    };
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw err;
    }

    return {
      apps: curatedApps,
      mode: 'curated-fallback',
      repoCount: curatedApps.length,
      syncedAt: nowIso,
      notice: `Unable to reach GitHub API; showing curated catalog entries for @${cleanUsername}.`,
    };
  }
}
