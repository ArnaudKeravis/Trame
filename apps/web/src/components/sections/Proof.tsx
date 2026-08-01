import { siteContent, type Credential } from "@/data/site";
import { TrameWeave } from "@/components/brand/TrameWeave";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Editorial";

export function Proof() {
  const { proof } = siteContent;

  return (
    <section
      id={proof.id}
      className="relative overflow-hidden bg-trame-black section-pad section-y text-trame-paper"
    >
      <TrameWeave variant="black" opacity={0.4} />

      <div className="relative mx-auto max-w-[90rem]">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="editorial-num" aria-hidden="true">
              {proof.number}
            </span>
            <SectionLabel light className="mb-0">{proof.label}</SectionLabel>
          </div>
          <h2 className="display-title mt-4 max-w-[14ch] text-trame-paper">
            {proof.headline}
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-trame-paper/55">
            {proof.description}
          </p>
        </Reveal>

        <div className="mt-20 border-t border-trame-paper/15">
          {(proof.credentials as readonly Credential[]).map((cred, i) => (
            <Reveal key={cred.id} delay={i * 0.08}>
              <article className="grid gap-6 border-b border-trame-paper/15 py-10 md:grid-cols-[1fr_1.2fr_auto]">
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.16em] text-trame-paper/45">
                    {cred.status === "pilot" ? "Pilote en cours" : "Mission"}
                  </p>
                  {cred.client && (
                    <h3 className="font-display mt-3 text-2xl text-trame-paper">
                      {cred.client}
                    </h3>
                  )}
                  {cred.sector && (
                    <p className="mt-2 text-sm text-trame-paper/55">{cred.sector}</p>
                  )}
                </div>
                <div>
                  {cred.workflow && (
                    <>
                      <p className="font-label text-[10px] uppercase tracking-[0.16em] text-trame-paper/45">
                        Workflow
                      </p>
                      <p className="mt-3 text-lg text-trame-paper">{cred.workflow}</p>
                    </>
                  )}
                  {cred.objective && (
                    <p className="mt-4 text-sm text-trame-paper/55">
                      Objectif : {cred.objective}
                    </p>
                  )}
                  {cred.metric && (
                    <p className="font-display mt-4 text-3xl text-trame-blue">
                      {cred.metric}
                    </p>
                  )}
                  {cred.quote && (
                    <blockquote className="mt-4 text-sm italic text-trame-paper/65">
                      « {cred.quote} »
                    </blockquote>
                  )}
                </div>
                {(cred.before || cred.after) && (
                  <div className="md:text-right">
                    {cred.before && (
                      <p className="text-sm text-trame-paper/40 line-through">
                        {cred.before}
                      </p>
                    )}
                    {cred.after && (
                      <p className="font-display mt-2 text-xl text-trame-paper">
                        {cred.after}
                      </p>
                    )}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
