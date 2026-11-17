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
    id: 'blackout',
    name: 'Blackout',
    repoName: 'blackout',
    platform: 'android',
    license: 'Open Source',
    primaryLanguage: 'Kotlin',
    summary:
      'A minimalist, OLED-friendly clock and battery monitor app designed for Android devices, with special support for dual-screen handhelds like the Ayn Thor.',
    functionalityHighlights: [
      'True-black OLED clock and battery status display built to minimize power draw and burn-in',
      'Custom time and battery threshold alerts with fast-scrolling long-press time picker',
      'Tailored layout support for dual-screen Android handhelds such as the Ayn Thor',
    ],
    techStack: ['Kotlin', 'Android'],
    githubUrl: 'https://github.com/bboti86/blackout',
    liveOrDownloadUrl: 'https://github.com/bboti86/blackout/releases',
    liveOrDownloadLabel: 'Releases on GitHub',
    source: 'curated',
    versions: [
      {
        version: 'v1.2.1',
        date: '2026-08-24',
        title: 'v1.2.1 — Long-press time picker fix',
        changes: [
          'Fixed fast-scrolling in time picker so long-press increments update values reliably.',
        ],
        releaseUrl: 'https://github.com/bboti86/blackout/releases/tag/v1.2.1',
      },
      {
        version: 'v1.2.0',
        date: '2026-08-24',
        title: 'v1.2.0 — Long-press time setting',
        changes: [
          'Added long-press fast-scrolling support when setting time.',
          'Updated README with fast-scrolling time picker details.',
        ],
        releaseUrl: 'https://github.com/bboti86/blackout/releases/tag/v1.2.0',
      },
      {
        version: 'v1.1.0',
        date: '2026-08-19',
        title: 'v1.1.0 — Time and battery threshold',
        changes: [
          'Added configurable time and battery threshold support.',
        ],
        releaseUrl: 'https://github.com/bboti86/blackout/releases/tag/v1.1.0',
      },
    ],
    commits: [
      {
        sha: 'dda450a',
        date: '2026-08-24',
        headline: 'Fix: fast-scrolling in time picker now correctly updates values',
        author: 'bboti86',
        commitUrl: 'https://github.com/bboti86/blackout/commit/dda450a',
      },
      {
        sha: 'f97c504',
        date: '2026-08-24',
        headline: 'Docs: Update README with fast-scrolling time picker feature',
        author: 'bboti86',
        commitUrl: 'https://github.com/bboti86/blackout/commit/f97c504',
      },
      {
        sha: '6c7dd23',
        date: '2026-08-24',
        headline: 'Feature: Fast-scrolling time picker with long-press support',
        author: 'bboti86',
        commitUrl: 'https://github.com/bboti86/blackout/commit/6c7dd23',
      },
    ],
  },
  {
    id: 'lauralabor',
    name: 'LauraLabor',
    repoName: 'LauraLabor',
    platform: 'android',
    license: 'MIT',
    primaryLanguage: 'HTML',
    summary:
      'Laura tanuló alkalmazásai — interactive learning modules for kids covering math and English, packaged as an Android APK for Pixel Tablet and Kids Space.',
    functionalityHighlights: [
      'Interactive math (including Order of Operations) and English lessons (Colours, Numbers, School Things)',
      'Per-lesson and per-category visibility toggles in settings',
      'Packaged as a standalone Android APK tailored for Pixel Tablet and Kids Space',
    ],
    techStack: ['HTML', 'JavaScript', 'CSS', 'Android APK'],
    githubUrl: 'https://github.com/bboti86/LauraLabor',
    liveOrDownloadUrl: 'https://github.com/bboti86/LauraLabor/releases',
    liveOrDownloadLabel: 'Releases on GitHub',
    source: 'curated',
    versions: [
      {
        version: 'v1.0.0',
        date: '2026-11-14',
        title: 'Laura Tanulósarka – Android APK (Pixel Tablet & Kids Space)',
        changes: [
          'First packaged Android APK release for Pixel Tablet & Kids Space.',
          'Includes math and English learning modules with offline support.',
        ],
        releaseUrl: 'https://github.com/bboti86/LauraLabor/releases/tag/v1.0.0',
      },
    ],
    commits: [
      {
        sha: '618b716',
        date: '2026-11-17',
        headline: 'feat(settings): add per-lesson and per-category visibility toggles',
        author: 'bboti86',
        commitUrl: 'https://github.com/bboti86/LauraLabor/commit/618b716',
      },
      {
        sha: 'f1c1aaa',
        date: '2026-11-14',
        headline: 'feat(matek): add Order of Operations (Műveleti sorrend) lesson',
        author: 'bboti86',
        commitUrl: 'https://github.com/bboti86/LauraLabor/commit/f1c1aaa',
      },
      {
        sha: 'fc4649f',
        date: '2026-11-14',
        headline: 'feat(angol): add English category with Colours, Numbers, and School Things lessons',
        author: 'bboti86',
        commitUrl: 'https://github.com/bboti86/LauraLabor/commit/fc4649f',
      },
    ],
  },
  {
    id: 'fuggvenytablazat',
    name: 'Függvénytáblázat',
    repoName: 'fuggvenytablazat',
    platform: 'pwa',
    license: 'MIT',
    primaryLanguage: 'JavaScript',
    summary:
      'Vezetés szervezés tantárgy függvénytáblázata — an installable offline-capable Progressive Web App with formulas, flashcards, and KaTeX equations.',
    functionalityHighlights: [
      'Full PWA support with Web App Manifest, offline Service Worker (sw.js), and install modal',
      'Interactive formula reference, inline abbreviation legends, and flashcards',
      'Mobile-friendly responsive KaTeX equation wrapping with iOS safe-area support',
    ],
    techStack: ['JavaScript', 'HTML', 'CSS', 'Service Workers', 'KaTeX'],
    githubUrl: 'https://github.com/bboti86/fuggvenytablazat',
    liveOrDownloadUrl: 'https://github.com/bboti86/fuggvenytablazat/releases',
    liveOrDownloadLabel: 'Releases on GitHub',
    source: 'curated',
    versions: [
      {
        version: 'main',
        date: '2026-11-14',
        title: 'Active Repository Branch',
        changes: [
          'Added Műveleti sorrend lesson, inline abbreviation legends, and multi-line KaTeX wrapping.',
          'Added full PWA support with offline Service Worker and install prompt.',
        ],
        releaseUrl: 'https://github.com/bboti86/fuggvenytablazat',
      },
    ],
    commits: [
      {
        sha: 'c5399ec',
        date: '2026-11-14',
        headline: 'Add Műveleti sorrend lecke, inline abbreviation legends in every formula/flashcard, and multi-line equation wrapping without horizontal scroll',
        author: 'bboti86',
        commitUrl: 'https://github.com/bboti86/fuggvenytablazat/commit/c5399ec',
      },
      {
        sha: 'a007de0',
        date: '2026-11-14',
        headline: 'Fix mobile and PWA proportions: prevent wide KaTeX grid blowout, wrap top navigation cleanly, and add iOS safe-area support',
        author: 'bboti86',
        commitUrl: 'https://github.com/bboti86/fuggvenytablazat/commit/a007de0',
      },
      {
        sha: '5e0da3e',
        date: '2026-11-14',
        headline: 'Add full PWA support (manifest.webmanifest, offline Service Worker sw.js, app icons, and install button/modal)',
        author: 'bboti86',
        commitUrl: 'https://github.com/bboti86/fuggvenytablazat/commit/5e0da3e',
      },
    ],
  },
  {
    id: 'arcadecheck',
    name: 'ArcadeCheck',
    repoName: 'arcadecheck',
    platform: 'android',
    license: 'Open Source',
    primaryLanguage: 'Kotlin',
    summary:
      'High-performance arcade ROM auditor written in Kotlin.',
    functionalityHighlights: [
      'Fast local verification and auditing of arcade ROM sets',
      'Written in Kotlin with clean, standalone release packaging',
    ],
    techStack: ['Kotlin'],
    githubUrl: 'https://github.com/bboti86/arcadecheck',
    liveOrDownloadUrl: 'https://github.com/bboti86/arcadecheck/releases',
    liveOrDownloadLabel: 'Releases on GitHub',
    source: 'curated',
    versions: [
      {
        version: 'v1.0.0',
        date: '2026-08-18',
        title: 'v1.0.0',
        changes: [
          'Initial release of ArcadeCheck: High-performance arcade ROM auditor.',
        ],
        releaseUrl: 'https://github.com/bboti86/arcadecheck/releases/tag/v1.0.0',
      },
    ],
    commits: [
      {
        sha: 'eaa76dd',
        date: '2026-08-18',
        headline: 'Initial release of ArcadeCheck: High-performance arcade ROM auditor',
        author: 'bboti86',
        commitUrl: 'https://github.com/bboti86/arcadecheck/commit/eaa76dd',
      },
    ],
  },
  {
    id: 'ar-money',
    name: 'AR Money',
    repoName: 'AR_Money',
    platform: 'pwa',
    license: 'MIT',
    primaryLanguage: 'TypeScript',
    summary:
      'Visualize money in AR directly in the web browser using TypeScript.',
    functionalityHighlights: [
      'Browser-based augmented reality scene for visualizing currency',
      'Built with TypeScript and web AR primitives',
    ],
    techStack: ['TypeScript', 'HTML', 'JavaScript'],
    githubUrl: 'https://github.com/bboti86/AR_Money',
    liveOrDownloadUrl: 'https://github.com/bboti86/AR_Money/releases',
    liveOrDownloadLabel: 'Releases on GitHub',
    source: 'curated',
    versions: [
      {
        version: 'main',
        date: '2026-06-01',
        title: 'Active Repository Branch',
        changes: [
          'Visualize money in AR.',
        ],
        releaseUrl: 'https://github.com/bboti86/AR_Money',
      },
    ],
    commits: [
      {
        sha: '749144e',
        date: '2026-06-01',
        headline: 'Fix DOMContentLoaded bug',
        author: 'bboti86',
        commitUrl: 'https://github.com/bboti86/AR_Money/commit/749144e',
      },
      {
        sha: '6a6f4db',
        date: '2026-06-01',
        headline: 'Fix typescript compilation errors in ar-scene.ts',
        author: 'bboti86',
        commitUrl: 'https://github.com/bboti86/AR_Money/commit/6a6f4db',
      },
    ],
  },
];
