import { siteContent } from "@/data/site";
import { TrameWeave } from "@/components/brand/TrameWeave";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  const { cta } = siteContent;

  return (
    <section
      id={cta.id}
      className="relative overflow-hidden bg-trame-black section-pad section-y text-trame-paper"
    >
      <TrameWeave variant="black" opacity={0.4} />

      <div className="relative mx-auto max-w-[90rem]">
        <Reveal>
          <h2 className="display-title max-w-[14ch] text-trame-paper">
            {cta.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-trame-paper/70">
            {cta.description}
          </p>
          <p className="font-label mt-4 text-xs uppercase tracking-[0.14em] text-trame-paper/45">
            {cta.detail}
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <a href={cta.buttonHref} className="btn-primary">
              {cta.button}
            </a>
            <a
              href={cta.secondaryHref}
              className="font-label text-xs uppercase tracking-[0.14em] text-trame-paper/50 underline-offset-4 transition-colors hover:text-trame-paper hover:underline"
            >
              {cta.secondary}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
