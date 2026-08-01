import { siteContent } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Editorial";

export function Offering() {
  const { offering } = siteContent;

  return (
    <section id={offering.id} className="section-pad section-y bg-trame-os text-trame-black">
      <div className="mx-auto max-w-[90rem]">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span
              className="editorial-num text-trame-black/15"
              aria-hidden="true"
            >
              {offering.number}
            </span>
            <SectionLabel className="mb-0">{offering.label}</SectionLabel>
          </div>
          <h2 className="display-title mt-4 max-w-[16ch] text-trame-black">
            {offering.headline}
          </h2>
        </Reveal>

        <div className="mt-16 border-t border-trame-filet">
          {offering.tiers.map((tier, i) => {
            const highlighted = "highlight" in tier && tier.highlight;
            return (
              <Reveal key={tier.name} delay={i * 0.06}>
                <div
                  className={`menu-row ${
                    highlighted ? "border-l-2 border-l-trame-black pl-4 -ml-px" : ""
                  }`}
                >
                  <div>
                    <p className="font-label text-[10px] uppercase tracking-[0.16em] text-trame-muted">
                      {tier.duration}
                      {highlighted && (
                        <span className="ml-3 text-trame-black">
                          · Cœur de l&apos;offre
                        </span>
                      )}
                    </p>
                    <h3 className="font-display mt-2 text-xl text-trame-black md:text-2xl">
                      {tier.name}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm text-trame-muted">
                      {tier.description}
                    </p>
                  </div>
                  <p
                    className={`font-display shrink-0 text-2xl md:text-3xl ${
                      highlighted ? "text-trame-blue" : "text-trame-black"
                    }`}
                  >
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
