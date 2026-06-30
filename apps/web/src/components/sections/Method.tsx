import { siteContent } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export function Method() {
  const { method } = siteContent;

  return (
    <section id="methode" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-serif text-4xl font-semibold md:text-5xl">
            {method.headline}
          </h2>
          <p className="mt-4 text-lg text-trame-muted">{method.subtitle}</p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {method.steps.map((step, i) => (
            <Reveal key={step.id} delay={i * 0.1}>
              <article className="group relative overflow-hidden rounded-2xl border border-trame-thread/20 bg-trame-surface p-8 transition-colors hover:border-trame-thread/50">
                <span className="font-mono text-5xl font-light text-trame-thread/30">
                  {step.number}
                </span>
                <h3 className="mt-4 font-serif text-2xl font-semibold">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-trame-muted">
                  {step.description}
                </p>
                <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-trame-thread/5 transition-transform group-hover:scale-110" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
