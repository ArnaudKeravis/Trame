import { siteContent } from "@/data/site";
import { TrameWeave } from "@/components/brand/TrameWeave";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  const { cta } = siteContent;

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-trame-blue section-pad section-y text-trame-paper"
    >
      <TrameWeave variant="blue" opacity={0.35} />

      <div className="relative mx-auto max-w-[90rem]">
        <Reveal>
          <h2 className="display-title max-w-[14ch] text-trame-paper">
            {cta.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-trame-paper/75">
            {cta.description}
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <a
            href={`mailto:${cta.email}`}
            className="mt-12 inline-flex border border-trame-paper/40 bg-trame-paper px-8 py-4 font-label text-xs font-medium uppercase tracking-[0.14em] text-trame-black transition-opacity hover:opacity-90"
          >
            {cta.button}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
