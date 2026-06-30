"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";

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
          ? "border-b border-trame-black/8 bg-trame-paper/92 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="section-pad mx-auto flex max-w-[90rem] items-center justify-between py-5">
        <Logo />
        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-label text-xs uppercase tracking-[0.14em] text-trame-muted transition-colors hover:text-trame-black"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn-primary py-2.5 text-[0.7rem]">
          Contact
        </a>
      </div>
    </header>
  );
}
