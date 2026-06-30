import { siteContent } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export function Offering() {
  const { offering } = siteContent;

  return (
    <section id="offre" className="bg-trame-ink px-6 py-32 text-trame-paper">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-serif text-4xl font-semibold md:text-5xl">
            {offering.headline}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {offering.tiers.map((tier, i) => {
            const highlighted = "highlight" in tier && tier.highlight;
            return (
            <Reveal key={tier.name} delay={i * 0.08}>
              <article
                className={`relative rounded-2xl p-8 ${
                  highlighted
                    ? "border-2 border-trame-thread bg-trame-weave/30"
                    : "border border-trame-paper/10 bg-trame-paper/5"
                }`}
              >
                {highlighted && (
                  <span className="absolute -top-3 left-8 rounded-full bg-trame-thread px-4 py-1 text-xs font-medium text-trame-ink">
                    Cœur de l&apos;offre
                  </span>
                )}
                <p className="text-sm uppercase tracking-wider text-trame-thread">
                  {tier.duration}
                </p>
                <h3 className="mt-3 font-serif text-2xl font-semibold">{tier.name}</h3>
                <p className="mt-3 text-trame-paper/60">{tier.description}</p>
                <p className="mt-6 font-serif text-3xl font-semibold text-trame-thread">
                  {tier.price}
                </p>
              </article>
            </Reveal>
          );
          })}
        </div>
      </div>
    </section>
  );
}
