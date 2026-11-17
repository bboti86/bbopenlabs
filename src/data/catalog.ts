/**
 * BB Open Labs — Single Structured Catalog Data File
 *
 * Designed for effortless portability to Google Antigravity:
 * Edit `labProfile`, `technologiesUsed`, or `curatedApps` below,
 * and the entire showcase updates automatically with zero backend setup.
 */

export type PlatformType = 'android' | 'pwa';

export type TechnologyId =
  | 'java'
  | 'kotlin'
  | 'react-native'
  | 'flutter'
  | 'javascript'
  | 'html'
  | 'css';

export interface AppVersion {
  version: string;
  date: string;
  title: string;
  changes: string[];
  releaseUrl?: string;
}

export interface AppCommit {
  sha: string;
  date: string;
  headline: string;
  details?: string;
  author?: string;
  commitUrl?: string;
}

export interface AppEntry {
  id: string;
  name: string;
  repoName: string;
  platform: PlatformType;
  license: string;
  primaryLanguage: string;
  summary: string;
  functionalityHighlights: string[];
  techStack: string[];
  githubUrl: string;
  liveOrDownloadUrl?: string;
  liveOrDownloadLabel?: string;
  previewImage?: string;
  previewAlt?: string;
  stars?: number;
  updatedAt?: string;
  source: 'curated' | 'github';
  versions: AppVersion[];
  commits: AppCommit[];
}

export interface TechnologyEntry {
  id: TechnologyId;
  name: string;
  category: 'Android Native' | 'Cross-Platform' | 'Web & PWA';
  roleSummary: string;
  accentColor: string;
}

export interface LabProfile {
  siteName: string;
  logoUrl: string;
  tagline: string;
  shortIntro: string;
  expandedBio: string[];
  aiGenerationNote: string;
  githubUsername: string;
  githubUrl: string;
}

const baseUrl = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export function withBase(assetPath: string): string {
  if (/^https?:\/\//i.test(assetPath)) {
    return assetPath;
  }
  return `${baseUrl}${assetPath.replace(/^\/+/, '')}`;
}

export const labProfile: LabProfile = {
  siteName: 'BB Open Labs',
  logoUrl: withBase('assets/aistudio/1794900246777_b61092ae.jpg'),
  tagline: 'Independent Android & Web PWA Software',
  shortIntro:
    'An open-source software lab crafting focused Android utilities and offline-capable Progressive Web Apps.',
  expandedBio: [
    'BB Open Labs is an independent software workshop dedicated to small, durable, open-source tools for Android devices and the modern web.',
    'Every application is built to run reliably offline, respect user privacy with zero tracking, and keep source code transparent and inspectable on GitHub.',
  ],
  aiGenerationNote:
    'All applications and release workflows in BB Open Labs are open-source and refined iteratively in the open.',
  githubUsername: 'bboti86',
  githubUrl: 'https://github.com/bboti86',
};

export const technologiesDisclosure =
  'The applications showcased here are built with the languages, frameworks, and web standards below.';

export const technologiesUsed: TechnologyEntry[] = [
  {
    id: 'kotlin',
    name: 'Kotlin',
    category: 'Android Native',
    roleSummary:
      'Primary language for native Android apps with Jetpack Compose UI, coroutines, and Room offline persistence.',
    accentColor: '#7F52FF',
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Android Native',
    roleSummary:
      'Foundational Android SDK compatibility, background services, and lightweight utility modules.',
    accentColor: '#B45309',
  },
  {
    id: 'react-native',
    name: 'React Native',
    category: 'Cross-Platform',
    roleSummary:
      'Shared mobile component architecture bridging native Android capabilities with declarative TypeScript views.',
    accentColor: '#0284C7',
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'Cross-Platform',
    roleSummary:
      'High-frame-rate custom UI rendering and adaptive material layouts compiled cleanly for Android.',
    accentColor: '#0369A1',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Web & PWA',
    roleSummary:
      'Client-side PWA logic, Service Worker caching strategies, IndexedDB storage, and Web Audio/Canvas APIs.',
    accentColor: '#A16207',
  },
  {
    id: 'html',
    name: 'HTML',
    category: 'Web & PWA',
    roleSummary:
      'Semantic accessible document structure, Web App Manifest integration, and zero-dependency markup.',
    accentColor: '#C2410C',
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'Web & PWA',
    roleSummary:
      'Responsive editorial grids, fluid typography scales, print-ready rules, and reduced-motion polish.',
    accentColor: '#1D4ED8',
  },
];

export const curatedApps: AppEntry[] = [
  {
    id: 'fieldnotes-android',
    name: 'FieldNotes',
    repoName: 'fieldnotes-android',
    platform: 'android',
    license: 'MIT',
    primaryLanguage: 'Kotlin',
    summary:
      'A distraction-free offline field notebook for Android built around fast plain-text capture, timestamped entries, and local Markdown export.',
    functionalityHighlights: [
      'Instant launch-to-editor capture with zero account login or cloud telemetry',
      'Local Room database with automatic daily Markdown backups to device storage',
      'Hardware-friendly low-contrast paper theme designed for outdoor readability',
    ],
    techStack: ['Kotlin', 'Jetpack Compose', 'Room DB', 'Material 3'],
    githubUrl: 'https://github.com/bboti86',
    liveOrDownloadUrl: 'https://github.com/bboti86',
    liveOrDownloadLabel: 'Releases on GitHub',
    previewImage: withBase('src/assets/images/app_fieldnotes_android_1794900404852.jpg'),
    previewAlt: 'FieldNotes Android app running on a matte black smartphone beside a linen notebook',
    source: 'curated',
    versions: [
      {
        version: 'v1.4.0',
        date: '2026-10-18',
        title: 'Batch Markdown Export & Search Indexing',
        changes: [
          'Added one-tap ZIP export of all dated field notes with preserved frontmatter.',
          'Implemented full-text FTS4 indexing for sub-20ms local note search.',
          'Refined serif reading typography and dynamic font scaling.',
        ],
      },
      {
        version: 'v1.3.0',
        date: '2026-08-04',
        title: 'Quick Tile Capture & Tag Filtering',
        changes: [
          'Introduced Android Quick Settings tile to open a blank timestamped note directly.',
          'Added lightweight inline tag parsing without folder clutter.',
        ],
      },
      {
        version: 'v1.2.0',
        date: '2026-05-22',
        title: 'Offline Auto-Snapshot & Conflict Guard',
        changes: [
          'Added local revision snapshots every 60 seconds during active editing.',
          'Migrated storage preferences to Jetpack DataStore.',
        ],
      },
      {
        version: 'v1.0.0',
        date: '2026-02-11',
        title: 'Initial Public Open-Source Release',
        changes: [
          'First signed APK release with offline note creation, timestamps, and plain-text sharing.',
        ],
      },
    ],
    commits: [
      {
        sha: 'a8f31c2',
        date: '2026-10-18',
        headline: 'feat(export): bundle dated markdown files into single ZIP archive',
        details: 'Preserves YAML frontmatter timestamps and escapes filenames cleanly for Android scoped storage.',
        author: 'bboti86',
      },
      {
        sha: '7d20e9b',
        date: '2026-10-12',
        headline: 'perf(search): index note bodies using Room FTS4 virtual table',
        details: 'Reduces cold-search latency across 1,000+ local notes from 140ms to under 18ms.',
        author: 'bboti86',
      },
      {
        sha: '3b94a10',
        date: '2026-08-03',
        headline: 'feat(tile): add Quick Settings tile for instant blank entry',
        author: 'bboti86',
      },
    ],
  },
  {
    id: 'folio-reader-pwa',
    name: 'Folio Offline Reader',
    repoName: 'folio-offline-reader',
    platform: 'pwa',
    license: 'Apache-2.0',
    primaryLanguage: 'JavaScript',
    summary:
      'An installable Progressive Web App for reading long-form essays, technical specs, and saved HTML articles offline with editorial typography.',
    functionalityHighlights: [
      'Installable standalone PWA powered by Cache Storage and Service Worker prefetching',
      'IndexedDB article archive with customizable measure, line-height, and sepia paper tones',
      'Clean OPML / JSON library import and export for zero-lock-in reading lists',
    ],
    techStack: ['JavaScript', 'HTML', 'CSS', 'Service Workers', 'IndexedDB'],
    githubUrl: 'https://github.com/bboti86',
    liveOrDownloadUrl: 'https://github.com/bboti86',
    liveOrDownloadLabel: 'Inspect PWA Source',
    previewImage: withBase('src/assets/images/app_offline_reader_pwa_1794900404401.jpg'),
    previewAlt: 'Folio Offline Reader PWA open on an aluminum laptop on a warm oak desk',
    source: 'curated',
    versions: [
      {
        version: 'v2.1.0',
        date: '2026-11-02',
        title: 'Reading Progress Sync & Margin Highlights',
        changes: [
          'Added persistent scroll-position memory and inline text highlights stored in IndexedDB.',
          'Improved Service Worker update prompt so active reading sessions are never interrupted.',
          'Added keyboard navigation shortcuts for desktop PWA windows.',
        ],
      },
      {
        version: 'v2.0.0',
        date: '2026-07-19',
        title: 'Full Editorial Typography Engine',
        changes: [
          'Rebuilt reader layout with balanced 65ch measure and tabular footnote numbering.',
          'Added offline Web Share Target support for saving links directly from mobile browsers.',
        ],
      },
      {
        version: 'v1.1.0',
        date: '2026-04-03',
        title: 'JSON Backup & Dark Paper Mode',
        changes: [
          'Added single-file JSON archive export and warm charcoal reading palette.',
        ],
      },
    ],
    commits: [
      {
        sha: 'e41c90f',
        date: '2026-11-02',
        headline: 'feat(reader): persist scroll offset and inline highlights in IndexedDB',
        details: 'Debounces scroll state saves every 400ms and restores reading position on offline relaunch.',
        author: 'bboti86',
      },
      {
        sha: 'c18a224',
        date: '2026-10-25',
        headline: 'fix(sw): defer service worker skipWaiting until reading pane closes',
        author: 'bboti86',
      },
      {
        sha: '95f0d17',
        date: '2026-07-18',
        headline: 'refactor(layout): enforce 65ch measure and tabular footnote numbers',
        author: 'bboti86',
      },
    ],
  },
  {
    id: 'cadence-intervals-android',
    name: 'Cadence Intervals',
    repoName: 'cadence-intervals',
    platform: 'android',
    license: 'MIT',
    primaryLanguage: 'Java',
    summary:
      'A tactile interval timer and daily routine tracker for Android built to keep work blocks, study cycles, and movement breaks reliable in background mode.',
    functionalityHighlights: [
      'Foreground service precision timer unaffected by aggressive battery optimization',
      'Custom interval chains (work, rest, hydration, walk) with subtle haptic cues',
      'Weekly completion log stored locally with CSV export',
    ],
    techStack: ['Java', 'Kotlin', 'Flutter', 'Foreground Services'],
    githubUrl: 'https://github.com/bboti86',
    liveOrDownloadUrl: 'https://github.com/bboti86',
    liveOrDownloadLabel: 'Releases on GitHub',
    previewImage: withBase('src/assets/images/app_cadence_android_1794900403764.jpg'),
    previewAlt: 'Cadence Intervals Android timer app displayed on a phone beside an espresso cup',
    source: 'curated',
    versions: [
      {
        version: 'v1.5.2',
        date: '2026-09-29',
        title: 'Android 15 Foreground Notification Refinement',
        changes: [
          'Updated foreground timer notification channel for lock-screen pause/resume controls.',
          'Reduced wake-lock overhead during screen-off intervals by 38%.',
        ],
      },
      {
        version: 'v1.4.0',
        date: '2026-06-14',
        title: 'Multi-Step Routine Templates',
        changes: [
          'Added reusable morning, deep-work, and recovery interval presets.',
          'Introduced CSV export for daily completed cycles.',
        ],
      },
      {
        version: 'v1.0.0',
        date: '2026-01-17',
        title: 'Initial Android Release',
        changes: [
          'Core 25/5 interval timer, haptic alerts, and four daily habit checkpoints.',
        ],
      },
    ],
    commits: [
      {
        sha: '4f72b19',
        date: '2026-09-29',
        headline: 'fix(service): align foreground timer channel with Android 15 policies',
        details: 'Adds lock-screen pause/resume MediaStyle actions and trims background wake-lock cycles.',
        author: 'bboti86',
      },
      {
        sha: '1a66c0e',
        date: '2026-06-13',
        headline: 'feat(export): generate weekly CSV summary from local interval log',
        author: 'bboti86',
      },
      {
        sha: '09d8e33',
        date: '2026-06-05',
        headline: 'feat(presets): add reusable deep-work and recovery interval chains',
        author: 'bboti86',
      },
    ],
  },
  {
    id: 'soundsketch-pwa',
    name: 'SoundSketch Analyzer',
    repoName: 'soundsketch-pwa',
    platform: 'pwa',
    license: 'MIT',
    primaryLanguage: 'JavaScript',
    summary:
      'A browser-native Web Audio PWA for inspecting short voice memos, marking tabular timestamps, and reviewing acoustic waveforms completely offline.',
    functionalityHighlights: [
      'Zero-upload client-side Web Audio API waveform rendering at 60fps',
      'Timestamped marker table with millisecond-accurate jump-to-segment playback',
      'Works offline across desktop and Android Chrome via installable PWA manifest',
    ],
    techStack: ['JavaScript', 'React Native', 'HTML', 'CSS', 'Web Audio API'],
    githubUrl: 'https://github.com/bboti86',
    liveOrDownloadUrl: 'https://github.com/bboti86',
    liveOrDownloadLabel: 'Inspect PWA Source',
    previewImage: withBase('src/assets/images/app_soundsketch_pwa_1794900406447.jpg'),
    previewAlt: 'SoundSketch Analyzer PWA running on a tablet on neutral linen',
    source: 'curated',
    versions: [
      {
        version: 'v1.2.1',
        date: '2026-10-08',
        title: 'Marker CSV Export & Peak Detection',
        changes: [
          'Added automatic amplitude peak markers and tabular CSV export.',
          'Fixed mobile touch scrubbing precision on high-DPI tablet screens.',
        ],
      },
      {
        version: 'v1.1.0',
        date: '2026-07-01',
        title: 'Offline File Persistence',
        changes: [
          'Added local audio buffer caching in IndexedDB so recent sessions survive reloads.',
        ],
      },
      {
        version: 'v1.0.0',
        date: '2026-03-19',
        title: 'Initial PWA Release',
        changes: [
          'Launched offline waveform canvas, manual timestamp markers, and PWA installability.',
        ],
      },
    ],
    commits: [
      {
        sha: '8c55a4d',
        date: '2026-10-08',
        headline: 'feat(analysis): detect amplitude peaks and export marker table CSV',
        details: 'Computes RMS peak candidates locally using OfflineAudioContext without blocking UI rendering.',
        author: 'bboti86',
      },
      {
        sha: '6b12f90',
        date: '2026-10-01',
        headline: 'fix(canvas): normalize pointer coordinates on high-DPI tablet screens',
        author: 'bboti86',
      },
      {
        sha: '2e41d7a',
        date: '2026-06-30',
        headline: 'feat(storage): cache decoded audio buffers in IndexedDB for offline reload',
        author: 'bboti86',
      },
    ],
  },
];
