import { ArrowUpRight, Moon, Sun } from 'lucide-react';
import { type PlatformType, labProfile } from '../data/catalog';

interface HeaderProps {
  onSelectPlatformFromNav: (platform: PlatformType | 'all') => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Header({
  onSelectPlatformFromNav,
  isDark,
  onToggleTheme,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-hairline)] bg-[var(--color-paper)]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
        <a
          href="#top"
          className="inline-flex items-center gap-3 font-display text-xl font-semibold tracking-tight text-[var(--color-ink)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-brand)]"
        >
          <img
            src={labProfile.logoUrl}
            alt="BB Open Labs logo"
            className="h-8 w-auto object-contain mix-blend-multiply dark:mix-blend-normal dark:rounded dark:bg-[#F8F9FB] dark:px-1.5 dark:py-0.5"
          />
          <span>{labProfile.siteName}</span>
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[var(--color-muted)]"
        >
          <a
            href="#catalog"
            onClick={() => onSelectPlatformFromNav('all')}
            className="hover:text-[var(--color-ink)] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Catalog
          </a>
          <a
            href="#catalog"
            onClick={() => onSelectPlatformFromNav('android')}
            className="hover:text-[var(--color-ink)] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Android
          </a>
          <a
            href="#catalog"
            onClick={() => onSelectPlatformFromNav('pwa')}
            className="hover:text-[var(--color-ink)] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Web PWAs
          </a>
          <a
            href="#technologies"
            className="hover:text-[var(--color-ink)] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Technologies
          </a>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDark}
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-hairline)] bg-[var(--color-surface)] px-3 py-2 text-xs font-medium text-[var(--color-ink)] hover:border-[var(--color-ink)]/35 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]"
          >
            {isDark ? (
              <Sun className="h-3.5 w-3.5 text-[var(--color-brand-text)]" aria-hidden="true" />
            ) : (
              <Moon className="h-3.5 w-3.5 text-[var(--color-muted)]" aria-hidden="true" />
            )}
            <span>{isDark ? 'Light' : 'Dark'}</span>
          </button>

          <a
            href={labProfile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-[var(--color-brand)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]"
          >
            <span>GitHub Profile</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}
