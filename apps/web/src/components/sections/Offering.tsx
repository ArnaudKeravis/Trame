import { siteContent } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Editorial";

export function Offering() {
  const { offering } = siteContent;

  return (
    <section id="offre" className="section-pad section-y bg-trame-black text-trame-paper">
      <div className="mx-auto max-w-[90rem]">
        <Reveal>
          <SectionLabel light>L&apos;offre</SectionLabel>
          <h2 className="display-title max-w-[16ch] text-trame-paper">
            {offering.headline}
          </h2>
        </Reveal>

        <div className="mt-16 border-t border-trame-paper/15">
          {offering.tiers.map((tier, i) => {
            const highlighted = "highlight" in tier && tier.highlight;
            return (
              <Reveal key={tier.name} delay={i * 0.06}>
                <div
                  className={`menu-row ${highlighted ? "border-l-2 border-l-trame-blue pl-4 -ml-4" : ""}`}
                >
                  <div>
                    <p className="font-label text-[10px] uppercase tracking-[0.16em] text-trame-paper/45">
                      {tier.duration}
                      {highlighted && (
                        <span className="ml-3 text-trame-blue">· Cœur de l&apos;offre</span>
                      )}
                    </p>
                    <h3 className="font-display mt-2 text-xl text-trame-paper md:text-2xl">
                      {tier.name}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm text-trame-paper/55">
                      {tier.description}
                    </p>
                  </div>
                  <p className="font-display shrink-0 text-2xl text-trame-blue md:text-3xl">
                    {tier.price}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
