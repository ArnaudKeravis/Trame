import { siteContent } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Editorial";

export function Pain() {
  const { pain } = siteContent;

  return (
    <section id={pain.id} className="section-pad section-y bg-trame-os">
      <div className="mx-auto max-w-[90rem]">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="editorial-num" aria-hidden="true">
              {pain.number}
            </span>
            <SectionLabel className="mb-0">{pain.label}</SectionLabel>
          </div>
          <h2 className="display-title mt-4 max-w-[22ch] text-trame-black">
            {pain.question}
          </h2>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-trame-muted">
            {pain.headline}
          </p>
        </Reveal>

        <ul className="mt-20 border-t border-trame-filet">
          {pain.items.map((item, i) => (
            <Reveal key={item} delay={i * 0.06}>
              <li className="border-b border-trame-filet py-6 font-display text-xl text-trame-black md:text-2xl">
                {item}
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
