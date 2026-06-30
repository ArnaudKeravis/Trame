import { siteContent } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel, Hairline } from "@/components/ui/Editorial";

export function Workflows() {
  const { workflows } = siteContent;

  return (
    <section className="section-pad section-y bg-trame-paper">
      <div className="mx-auto max-w-[90rem]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <Reveal>
            <SectionLabel>Terrain</SectionLabel>
            <h2 className="display-title">{workflows.headline}</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-trame-muted">
              {workflows.description}
            </p>
          </Reveal>

          <div>
            {workflows.items.map((item, i) => (
              <Reveal key={item} delay={i * 0.05}>
                <div className="grid grid-cols-[3.5rem_1fr] items-baseline gap-4 border-t border-trame-black/10 py-5">
                  <span className="font-display text-lg text-trame-blue">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base text-trame-black">{item}</p>
                </div>
              </Reveal>
            ))}
            <Hairline />
          </div>
        </div>
      </div>
    </section>
  );
}
