"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "Problème", href: "#probleme" },
  { label: "Méthode", href: "#methode" },
  { label: "Offre", href: "#offre" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-trame-thread/20 bg-trame-paper/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="font-serif text-xl font-semibold tracking-tight">
          Trame
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-trame-muted transition-colors hover:text-trame-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-trame-weave px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Nous contacter
        </a>
      </div>
    </header>
  );
}
