import { siteContent } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Editorial";

export function Pains() {
  const { pains } = siteContent;

  return (
    <section className="section-pad section-y">
      <div className="mx-auto max-w-[90rem]">
        <Reveal>
          <SectionLabel>Douleurs chiffrées</SectionLabel>
          <h2 className="display-title max-w-[14ch]">{pains.headline}</h2>
        </Reveal>

        <div className="mt-16 overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="table-row border-t border-trame-black/15 font-label text-[10px] uppercase tracking-[0.16em] text-trame-muted">
              <span>Workflow</span>
              <span>Avant</span>
              <span>Après</span>
              <span />
            </div>
            {pains.items.map((pain, i) => (
              <Reveal key={pain.workflow} delay={i * 0.06}>
                <div className="table-row">
                  <span className="font-label text-xs uppercase tracking-[0.1em] text-trame-black">
                    {pain.workflow}
                  </span>
                  <span className="text-trame-muted line-through decoration-trame-black/20">
                    {pain.before}
                  </span>
                  <span className="font-display text-xl text-trame-blue">
                    {pain.after}
                  </span>
                  <span className="font-display text-2xl text-trame-black/10">
                    →
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
