import { siteContent } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export function Problem() {
  const { problem } = siteContent;

  return (
    <section id="probleme" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-3xl font-serif text-4xl font-semibold leading-tight md:text-5xl">
            {problem.headline}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {problem.stats.map((stat, i) => (
            <Reveal key={stat.value} delay={i * 0.1}>
              <div className="rounded-2xl border border-trame-thread/20 bg-trame-surface p-10">
                <p className="font-serif text-6xl font-semibold text-trame-weave md:text-7xl">
                  {stat.value}
                </p>
                <p className="mt-4 text-lg text-trame-muted">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-12 max-w-2xl text-lg text-trame-muted">{problem.insight}</p>
        </Reveal>
      </div>
    </section>
  );
}
