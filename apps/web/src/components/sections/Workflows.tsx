import { siteContent } from "@/data/site";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Reveal } from "@/components/ui/Reveal";

export function Workflows() {
  const { workflows } = siteContent;

  return (
    <section className="relative overflow-hidden px-6 py-32">
      <ParallaxLayer
        className="pointer-events-none absolute right-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-trame-thread/5"
        speed={0.4}
      >
        <div />
      </ParallaxLayer>

      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-serif text-4xl font-semibold md:text-5xl">
            {workflows.headline}
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-trame-muted">
            {workflows.description}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workflows.items.map((item, i) => (
            <Reveal key={item} delay={i * 0.06}>
              <div className="group rounded-xl border border-trame-thread/15 bg-trame-surface p-6 transition-all hover:border-trame-thread/40 hover:shadow-lg hover:shadow-trame-thread/5">
                <span className="font-mono text-xs text-trame-thread">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 font-medium">{item}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
