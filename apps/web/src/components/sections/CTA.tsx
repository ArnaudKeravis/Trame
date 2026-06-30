import { siteContent } from "@/data/site";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  const { cta } = siteContent;

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-32">
      <ParallaxLayer
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-trame-thread/10 blur-3xl"
        speed={0.3}
      >
        <div />
      </ParallaxLayer>

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="font-serif text-4xl font-semibold md:text-5xl">
            {cta.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-lg text-trame-muted">{cta.description}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <a
            href={`mailto:${cta.email}`}
            className="mt-10 inline-block rounded-full bg-trame-weave px-10 py-4 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
          >
            {cta.button}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
