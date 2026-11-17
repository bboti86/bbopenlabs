import { technologiesDisclosure, technologiesUsed } from '../data/catalog';
import { TechnologyLogo } from './TechnologyIcons';

export function TechnologiesSection() {
  return (
    <section
      id="technologies"
      aria-labelledby="technologies-heading"
      className="border-t border-[var(--color-hairline)] bg-[var(--color-limestone)]/40 py-16"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end pb-10 border-b border-[var(--color-hairline)]">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium text-[var(--color-muted)]">
              Engineering Stack · Android &amp; Web PWAs
            </p>
            <h2
              id="technologies-heading"
              className="mt-2 font-display text-3xl sm:text-4xl font-medium tracking-tight text-[var(--color-ink)]"
            >
              Technologies Used
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              {technologiesDisclosure}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {technologiesUsed.map((tech) => (
            <div
              key={tech.id}
              className="flex flex-col justify-between rounded-xl border border-[var(--color-hairline)] bg-[var(--color-paper)] p-5 transition-colors hover:border-[var(--color-ink)]/30"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--color-hairline)] bg-[var(--color-limestone)]/60">
                    <TechnologyLogo id={tech.id} className="h-7 w-7" />
                  </div>
                  <span className="text-xs text-[var(--color-muted)]">
                    {tech.category}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-xl font-medium text-[var(--color-ink)]">
                  {tech.name}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {tech.roleSummary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
