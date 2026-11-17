import { ArrowUpRight } from 'lucide-react';
import { labProfile } from '../data/catalog';

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-hairline)] bg-[var(--color-paper)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3.5">
          <img
            src={labProfile.logoUrl}
            alt="BB Open Labs emblem"
            className="mt-0.5 h-8 w-auto object-contain mix-blend-multiply dark:mix-blend-normal dark:rounded dark:bg-[#F8F9FB] dark:px-1.5 dark:py-0.5 shrink-0"
          />
          <div className="space-y-1">
            <p className="font-display text-base font-medium text-[var(--color-ink)]">
              {labProfile.siteName}
            </p>
            <p className="max-w-xl text-xs leading-relaxed text-[var(--color-muted)]">
              {labProfile.shortIntro}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[var(--color-muted)] shrink-0">
          <a
            href={labProfile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-[var(--color-brand-text)] hover:underline underline-offset-4"
          >
            <span>github.com/{labProfile.githubUsername}</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <span aria-hidden="true">·</span>
          <span>Open-Source Android &amp; PWA Showcase</span>
        </div>
      </div>
    </footer>
  );
}
