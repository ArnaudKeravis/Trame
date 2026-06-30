import { siteContent } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export function Positioning() {
  const { positioning } = siteContent;

  return (
    <section className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="font-serif text-4xl font-semibold md:text-5xl">
              {positioning.headline}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-trame-muted">
              {positioning.description}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative aspect-square max-w-md rounded-2xl border border-trame-thread/20 bg-trame-surface p-8">
              <div className="absolute inset-4 grid grid-cols-2 grid-rows-2 gap-2">
                <div className="rounded-lg bg-trame-paper p-3 text-xs text-trame-muted">
                  Boutiques auto.
                </div>
                <div className="rounded-lg bg-trame-weave/10 p-3 text-xs font-medium text-trame-weave ring-2 ring-trame-thread">
                  Trame
                  <span className="mt-1 block text-[10px] font-normal text-trame-muted">
                    cognitif × codesign
                  </span>
                </div>
                <div className="rounded-lg bg-trame-paper p-3 text-xs text-trame-muted">
                  Change mgmt
                </div>
                <div className="rounded-lg bg-trame-paper p-3 text-xs text-trame-muted">
                  Géants ($$$)
                </div>
              </div>
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] uppercase tracking-widest text-trame-muted">
                Codesign ↑
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-trame-muted">
                Cognitif →
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          {positioning.principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="border-l-2 border-trame-thread pl-6">
                <h3 className="font-serif text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-trame-muted">{p.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
