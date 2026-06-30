import { siteContent } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel, Hairline } from "@/components/ui/Editorial";

export function Problem() {
  const { problem } = siteContent;
  const primaryStat = problem.stats[0];

  return (
    <section id="probleme" className="section-pad section-y bg-trame-paper">
      <div className="mx-auto max-w-[90rem]">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <Reveal>
            <SectionLabel>Le problème</SectionLabel>
            <h2 className="display-title max-w-[16ch]">{problem.headline}</h2>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex flex-col justify-end">
              <p className="stat-giant text-trame-blue">{primaryStat.value}</p>
              <Hairline />
              <p className="font-label mt-6 max-w-sm text-sm uppercase tracking-[0.08em] text-trame-muted">
                {primaryStat.label}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-24 grid gap-16 lg:grid-cols-2 lg:items-end">
          <Reveal delay={0.08}>
            <div>
              <p className="font-display text-5xl text-trame-black md:text-6xl">
                {problem.stats[1].value}
              </p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-trame-muted">
                {problem.stats[1].label}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-lg text-base leading-relaxed text-trame-muted">
              {problem.insight}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
