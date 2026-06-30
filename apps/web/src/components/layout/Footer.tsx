import { Logo } from "@/components/brand/Logo";
import { TrameWeave } from "@/components/brand/TrameWeave";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-trame-black px-6 py-16 text-trame-paper">
      <TrameWeave variant="black" opacity={0.5} />
      <div className="relative mx-auto flex max-w-[90rem] flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-trame-paper/55">
            Le cabinet qui révèle et reconçoit la trame du travail de la
            connaissance — preuve à l&apos;appui.
          </p>
        </div>
        <p className="font-label text-xs uppercase tracking-[0.14em] text-trame-paper/35">
          © {new Date().getFullYear()} Trame
        </p>
      </div>
    </footer>
  );
}
