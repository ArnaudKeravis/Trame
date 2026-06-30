import { siteContent } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Editorial";

export function Positioning() {
  const { positioning } = siteContent;

  return (
    <section className="section-pad section-y">
      <div className="mx-auto max-w-[90rem]">
        <div className="grid gap-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-28">
          <Reveal>
            <SectionLabel>Positionnement</SectionLabel>
            <h2 className="display-title max-w-[14ch]">{positioning.headline}</h2>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-trame-muted">
              {positioning.description}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative aspect-square max-w-md border border-trame-black/10 p-6">
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                <div className="border border-trame-black/8 p-4 font-label text-[10px] uppercase tracking-wider text-trame-muted">
                  Boutiques auto.
                </div>
                <div className="border border-trame-blue bg-trame-blue/5 p-4">
                  <span className="font-display text-sm text-trame-blue">TRAME</span>
                  <span className="mt-2 block font-label text-[10px] uppercase tracking-wider text-trame-muted">
                    cognitif × codesign
                  </span>
                </div>
                <div className="border border-trame-black/8 p-4 font-label text-[10px] uppercase tracking-wider text-trame-muted">
                  Change mgmt
                </div>
                <div className="border border-trame-black/8 p-4 font-label text-[10px] uppercase tracking-wider text-trame-muted">
                  Géants ($$$)
                </div>
              </div>
              <span className="absolute -left-1 top-1/2 -translate-x-full -translate-y-1/2 -rotate-90 font-label text-[9px] uppercase tracking-[0.2em] text-trame-muted">
                Codesign
              </span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-2 font-label text-[9px] uppercase tracking-[0.2em] text-trame-muted">
                Cognitif
              </span>
            </div>
          </Reveal>
        </div>

        <div className="mt-24 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {positioning.principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <article className="border-t border-trame-black/12 py-8 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
                <span className="font-display text-3xl text-trame-blue/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-4 text-lg">{p.title}</h3>
                <p className="mt-2 text-sm text-trame-muted">{p.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
