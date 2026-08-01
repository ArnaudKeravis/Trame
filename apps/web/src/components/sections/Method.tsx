import { siteContent } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Editorial";

export function Method() {
  const { method } = siteContent;

  return (
    <section id={method.id} className="section-pad section-y bg-trame-paper">
      <div className="mx-auto max-w-[90rem]">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="editorial-num text-trame-black/15" aria-hidden="true">
              {method.number}
            </span>
            <SectionLabel className="mb-0">{method.label}</SectionLabel>
          </div>
          <h2 className="display-title mt-4 max-w-[14ch]">{method.headline}</h2>
          <p className="mt-4 max-w-md text-trame-muted">{method.subtitle}</p>
        </Reveal>

        <div className="mt-20 grid gap-0 md:grid-cols-2 lg:grid-cols-4">
          {method.steps.map((step, i) => (
            <Reveal key={step.id} delay={i * 0.08}>
              <article className="border-t border-trame-black/12 py-8 md:border-l md:border-t-0 md:pl-8 md:first:border-l-0 md:first:pl-0 lg:py-0">
                <span className="editorial-num block" aria-hidden="true">
                  {step.number}
                </span>
                <h3 className="font-display mt-6 text-xl text-trame-black">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-trame-muted">
                  {step.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
