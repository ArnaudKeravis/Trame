export function Footer() {
  return (
    <footer className="border-t border-trame-thread/20 bg-trame-ink px-6 py-12 text-trame-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-2xl font-semibold">Trame</p>
          <p className="mt-2 max-w-sm text-sm text-trame-paper/60">
            Le cabinet qui révèle et reconçoit la trame du travail de la
            connaissance — preuve à l&apos;appui.
          </p>
        </div>
        <p className="text-sm text-trame-paper/40">© {new Date().getFullYear()} Trame</p>
      </div>
    </footer>
  );
}
