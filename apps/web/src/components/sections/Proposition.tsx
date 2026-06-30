import { siteContent } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel, Hairline } from "@/components/ui/Editorial";

export function Proposition() {
  const { proposition } = siteContent;

  return (
    <section className="section-pad section-y">
      <div className="mx-auto max-w-[90rem]">
        <Reveal>
          <SectionLabel>Proposition</SectionLabel>
          <h2 className="display-title max-w-[16ch]">{proposition.headline}</h2>
        </Reveal>

        <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-24">
          <Reveal delay={0.08}>
            <p className="font-label mb-8 text-xs uppercase tracking-[0.2em] text-trame-muted">
              Pas ça
            </p>
            <ul className="space-y-5">
              {proposition.not.map((item) => (
                <li
                  key={item}
                  className="border-b border-trame-black/8 pb-5 text-trame-muted line-through decoration-trame-black/25"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="font-label mb-8 text-xs uppercase tracking-[0.2em] text-trame-blue">
              Mais ça
            </p>
            <ul className="space-y-5">
              {proposition.but.map((item) => (
                <li
                  key={item}
                  className="border-b border-trame-black/8 pb-5 text-trame-black"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.24}>
          <Hairline />
          <p className="font-label mt-8 text-xs uppercase tracking-[0.14em] text-trame-muted">
            Comprendre → codesign → pilote fail-fast → transfert
          </p>
        </Reveal>
      </div>
    </section>
  );
}
