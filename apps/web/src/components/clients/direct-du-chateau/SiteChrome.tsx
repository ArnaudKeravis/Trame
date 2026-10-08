"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BASE, SHOP } from "./catalog";

const links = [
  { href: `${SHOP}/collections/frontpage`, label: "Vins", external: true },
  { href: `${BASE}/pages/nos-partenaires`, label: "Vignerons", external: false },
  { href: `${BASE}/pages/vins-pour-restaurateurs`, label: "Restaurateurs", external: false },
  { href: `${BASE}/pages/vins-pour-cavistes`, label: "Cavistes", external: false },
  { href: `${BASE}/pages/frais-de-port`, label: "Livraison", external: false },
  { href: `${BASE}/pages/contact`, label: "Contact", external: false },
];

function NavLinks() {
  return (
    <>
      {links.map((link) =>
        link.external ? (
          <a key={link.href} href={link.href} className="inline-flex min-h-11 items-center">
            {link.label}
          </a>
        ) : (
          <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center">
            {link.label}
          </Link>
        ),
      )}
    </>
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a href="#contenu" className="ddc-skip">
        Aller au contenu
      </a>
      <header className="sticky top-0 z-40 border-b border-[var(--ddc-line)] bg-[var(--ddc-paper)]">
        <p className="ddc-wrap flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2 text-sm text-[var(--ddc-muted)]">
          <span>Prévisualisation. Catalogue et paiement : boutique actuelle.</span>
          <a className="underline underline-offset-4" href={SHOP}>
            directduchateau.com
          </a>
        </p>
        <div className="ddc-wrap flex items-center justify-between gap-4 py-2">
          <Link href={BASE} className="ddc-display text-3xl leading-none" translate="no">
            Direct Du Château
          </Link>
          <nav className="hidden items-center gap-5 lg:flex" aria-label="Pages">
            <NavLinks />
          </nav>
          <Link href={`${BASE}/pages/compte-professionnel`} className="ddc-button hidden lg:inline-flex">
            Compte professionnel
          </Link>
          <button
            type="button"
            className="ddc-button-quiet inline-flex lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Fermer" : "Menu"}
          </button>
        </div>
        {open ? (
          <nav id="menu-mobile" className="ddc-wrap grid pb-4 lg:hidden" aria-label="Pages">
            <NavLinks />
            <Link href={`${BASE}/pages/compte-professionnel`} className="ddc-button mt-2 inline-flex justify-self-start">
              Compte professionnel
            </Link>
          </nav>
        ) : null}
      </header>
      {children}
      <footer className="border-t border-[var(--ddc-line)]">
        <div className="ddc-wrap grid gap-3 py-8 text-sm">
          <p className="ddc-display text-3xl" translate="no">
            Direct Du Château
          </p>
          <p>141 rue Michel Montaigne, 33350 Castillon-la-Bataille</p>
          <p>
            <a href="tel:+33666846000">06&nbsp;66&nbsp;84&nbsp;60&nbsp;00</a>
          </p>
          <p className="text-[var(--ddc-muted)]">E-mail et horaires non affichés : ils ne sont pas confirmés.</p>
        </div>
      </footer>
    </>
  );
}
