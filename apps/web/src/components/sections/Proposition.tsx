import { siteContent } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export function Proposition() {
  const { proposition } = siteContent;

  return (
    <section className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-3xl font-serif text-4xl font-semibold leading-tight md:text-5xl">
            {proposition.headline}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-trame-ink/10 bg-trame-surface/50 p-10">
              <p className="mb-6 text-sm font-medium uppercase tracking-widest text-trame-muted">
                Pas ça
              </p>
              <ul className="space-y-4">
                {proposition.not.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-trame-muted line-through decoration-trame-thread/40"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-trame-muted/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-trame-weave/20 bg-trame-weave/5 p-10">
              <p className="mb-6 text-sm font-medium uppercase tracking-widest text-trame-weave">
                Mais ça
              </p>
              <ul className="space-y-4">
                {proposition.but.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-trame-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-trame-thread" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
