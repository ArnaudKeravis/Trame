import { siteContent } from "@/data/site";
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
            <span
              className="editorial-num text-trame-paper/25"
              aria-hidden="true"
            >
              {proof.number}
            </span>
            <SectionLabel light className="mb-0">
              {proof.label}
            </SectionLabel>
          </div>
          <h2 className="display-title mt-4 max-w-[16ch] text-trame-paper">
            {proof.headline}
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-trame-paper/55">
            {proof.description}
          </p>
        </Reveal>

        <div className="mt-20 grid gap-0 border-t border-trame-paper/15 md:grid-cols-3">
          {proof.team.map((member, i) => (
            <Reveal key={member.id} delay={i * 0.08}>
              <article className="border-b border-trame-paper/15 py-10 md:border-b-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0 md:last:pr-0">
                <p className="font-label text-[10px] uppercase tracking-[0.16em] text-trame-paper/45">
                  {member.role}
                </p>
                <h3 className="font-display mt-3 text-2xl text-trame-paper">
                  {member.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-trame-paper/55">
                  {member.bio}
                </p>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-label mt-6 inline-block text-[10px] uppercase tracking-[0.16em] text-trame-paper/40 transition-colors hover:text-trame-paper"
                  >
                    LinkedIn →
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-20 border-t border-trame-paper/15 pt-12">
            <p className="font-label text-[10px] uppercase tracking-[0.16em] text-trame-paper/45">
              Ce qu&apos;on a fait
            </p>
            <ul className="mt-8 space-y-0">
              {proof.trackRecord.map((item) => (
                <li
                  key={item.id}
                  className="grid grid-cols-[minmax(5rem,8rem)_1fr] items-baseline gap-4 border-b border-trame-paper/15 py-5 md:grid-cols-[10rem_1fr]"
                >
                  <span
                    className={`font-display text-2xl md:text-3xl ${
                      item.accent ? "text-trame-blue" : "text-trame-paper"
                    }`}
                  >
                    {item.value}
                  </span>
                  <span className="text-sm leading-relaxed text-trame-paper/55 md:text-base">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
