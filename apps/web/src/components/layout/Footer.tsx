import { Logo } from "@/components/brand/Logo";
import { TrameWeave } from "@/components/brand/TrameWeave";
import { siteContent } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-trame-black section-pad py-16 text-trame-paper">
      <TrameWeave variant="black" opacity={0.5} />
      <div className="relative mx-auto flex max-w-[90rem] flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-trame-paper/55">
            {siteContent.footer.tagline}
          </p>
        </div>
        <p className="font-label text-xs uppercase tracking-[0.14em] text-trame-paper/35">
          © 2026 Trame
        </p>
      </div>
    </footer>
  );
}
