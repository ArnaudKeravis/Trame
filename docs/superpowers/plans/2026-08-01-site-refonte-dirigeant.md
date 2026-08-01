# Refonte site Trame (cible dirigeant PME) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adapter la landing Trame pour un dirigeant PME : douleur → preuve → offre, charte visuelle à la lettre, CTA diagnostic 500 €.

**Architecture:** Contenu centralisé dans `site.ts` ; sections React minces ; réordonner `page.tsx` ; retirer Problem / Workflows / Pains / Positioning ; créer Pain + Proof ; aligner tokens CSS.

**Tech Stack:** Next.js 16, React 19, Tailwind 4, framer-motion (existant), TypeScript.

**Spec :** `docs/superpowers/specs/2026-08-01-site-refonte-dirigeant-design.md`

---

## File map

| File | Responsibility |
|---|---|
| `apps/web/src/data/site.ts` | Copy + structure données (source unique) |
| `apps/web/src/app/globals.css` | Design tokens + utilitaires |
| `apps/web/src/app/layout.tsx` | Meta / OG description |
| `apps/web/src/app/page.tsx` | Ordre des sections |
| `apps/web/src/components/layout/Header.tsx` | Nav + CTA |
| `apps/web/src/components/layout/Footer.tsx` | Footer |
| `apps/web/src/components/sections/Hero.tsx` | Hero noir |
| `apps/web/src/components/sections/Pain.tsx` | **Nouveau** — douleur + question |
| `apps/web/src/components/sections/Truth.tsx` | 70/20/10, un accent |
| `apps/web/src/components/sections/Proposition.tsx` | Pas ça / Mais ça |
| `apps/web/src/components/sections/Method.tsx` | 4 étapes, n° ultramarine |
| `apps/web/src/components/sections/Proof.tsx` | **Nouveau** — credentials |
| `apps/web/src/components/sections/Offering.tsx` | Offre os, prix PME |
| `apps/web/src/components/sections/CTA.tsx` | CTA noir + secondaire |
| Delete usages | `Problem.tsx`, `Workflows.tsx`, `Pains.tsx`, `Positioning.tsx` |

Verification : pas de suite de tests unitaires — valider avec `npm run build` dans `apps/web`.

---

### Task 1: Tokens CSS

**Files:**
- Modify: `apps/web/src/app/globals.css`

- [ ] **Step 1: Remplacer `:root` et `@theme inline` + utilitaires marge**

Remplacer le bloc tokens en tête de fichier par :

```css
@import "tailwindcss";

:root {
  --trame-noir: #131012;
  --trame-os: #ece7dd;
  --trame-papier: #f6f3ec;
  --trame-ultramarine: #2c2be8;
  --trame-ultra-tint: #dad9f7;
  --trame-gris-chaud: #86837c;
  --trame-gris-froid: #9d9ba8;
  --trame-filet-clair: #d4cec1;
  --trame-filet-sombre: #35322c;
  --trame-marge: 7vw;
  /* aliases rétrocompat */
  --trame-black: var(--trame-noir);
  --trame-paper: var(--trame-os);
  --trame-blue: var(--trame-ultramarine);
  --trame-muted: var(--trame-gris-chaud);
  --background: var(--trame-os);
  --foreground: var(--trame-noir);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-trame-black: var(--trame-noir);
  --color-trame-paper: var(--trame-os);
  --color-trame-os: var(--trame-os);
  --color-trame-papier: var(--trame-papier);
  --color-trame-blue: var(--trame-ultramarine);
  --color-trame-muted: var(--trame-gris-chaud);
  --color-trame-filet: var(--trame-filet-clair);
  --font-display: var(--font-archivo);
  --font-label: var(--font-space-grotesk);
  --font-body: Arial, Helvetica, sans-serif;
}
```

Mettre à jour `.section-pad` :

```css
.section-pad {
  padding-left: max(1.5rem, var(--trame-marge));
  padding-right: max(1.5rem, var(--trame-marge));
}
```

Mettre à jour `.editorial-num` pour l’ultramarine (repère de navigation) :

```css
.editorial-num {
  font-family: var(--font-archivo), "Arial Black", sans-serif;
  font-weight: 900;
  font-size: clamp(3rem, 6vw, 5rem);
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--trame-ultramarine);
}
```

Garder le reste du fichier (`.font-display`, `.btn-primary`, `.hairline`, etc.) — ajuster `.hairline` pour utiliser `--trame-filet-clair` :

```css
.hairline {
  height: 1px;
  background: var(--trame-filet-clair);
}

.hairline-light {
  height: 1px;
  background: color-mix(in srgb, var(--trame-os) 18%, transparent);
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/web/src/app/globals.css
git commit -m "Aligner les design tokens sur la charte Trame."
```

---

### Task 2: Contenu `site.ts`

**Files:**
- Modify: `apps/web/src/data/site.ts`

- [ ] **Step 1: Remplacer entièrement le fichier**

```ts
export type Credential = {
  id: string;
  client: string;
  sector: string;
  workflow: string;
  before?: string;
  after?: string;
  metric?: string;
  quote?: string;
  status: "pilot" | "done";
  objective?: string;
};

export const siteContent = {
  meta: {
    title: "Trame",
    tagline: "Révéler la trame du travail. La reconcevoir avec l'IA.",
    description:
      "On récupère les heures que vos tâches répétitives vous volent. Diagnostic en demi-journée, preuve en 10 jours.",
  },
  nav: [
    { label: "Douleur", href: "#douleur" },
    { label: "Méthode", href: "#methode" },
    { label: "Preuve", href: "#preuve" },
    { label: "Offre", href: "#offre" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    headline: "Révéler la trame du travail.",
    subheadline: "La reconcevoir avec l'IA.",
    subheadlineAccentWord: "IA",
    description:
      "On récupère les heures que vos tâches répétitives vous volent — un système qui tourne en 10 jours.",
    cta: "Réserver un diagnostic",
    ctaHref: "#contact",
  },
  pain: {
    id: "douleur",
    number: "01",
    label: "La douleur",
    question:
      "Combien de temps passez-vous chaque semaine sur vos relances, vos appels d'offres ou vos devis ?",
    headline: "Si vous ne savez pas répondre en heures, ce n'est pas encore le bon moment.",
    items: [
      "Les relances qu'on n'a pas le temps de faire",
      "Les appels d'offres qu'on refait chaque année",
      "Les devis qui s'accumulent",
      "Le reporting du dimanche soir",
    ],
  },
  truth: {
    id: "verite",
    number: "02",
    label: "La vérité",
    headline: "La valeur n'est pas dans la techno. Elle est dans le travail.",
    breakdown: [
      { label: "Personnes & process", value: 70, accent: true },
      { label: "Tech & données", value: 20, accent: false },
      { label: "Algorithmes", value: 10, accent: false },
    ],
    quote: "Une révolution industrielle pour le travail de la connaissance",
    source: "Bain & Company",
  },
  proposition: {
    id: "proposition",
    number: "03",
    label: "La proposition",
    headline: "Nous ne vendons pas de l'IA. Nous vendons ses effets.",
    not: ["Des agents", "Des prompts", "De l'automatisation", "De la tech à intégrer"],
    but: [
      "Du temps gagné",
      "Une charge cognitive réduite",
      "Une meilleure capacité d'exécution",
      "Une adoption réussie",
    ],
    methodBand: "Comprendre → codesign → pilote fail-fast → transfert",
  },
  method: {
    id: "methode",
    number: "04",
    label: "La méthode",
    headline: "Du travail réel à la preuve",
    subtitle: "Puis on passe la main.",
    steps: [
      {
        id: "comprendre",
        number: "01",
        title: "Comprendre",
        description: "Observer le travail réel et les douleurs. Pas le process théorique.",
      },
      {
        id: "codesign",
        number: "02",
        title: "Codesign",
        description: "Concevoir le workflow cible avec les équipes. L'adoption commence ici.",
      },
      {
        id: "pilote",
        number: "03",
        title: "Pilote-preuve",
        description: "Fail-fast, faible coût. Démontrer la valeur, vite.",
      },
      {
        id: "transfert",
        number: "04",
        title: "Transfert & mesure",
        description: "Passer la main. Mesurer le résultat.",
      },
    ],
  },
  proof: {
    id: "preuve",
    number: "05",
    label: "La preuve",
    headline: "La preuve, pas la promesse.",
    description:
      "Chaque mission devient un credential : workflow, avant, après, le chiffre, la citation du dirigeant.",
    credentials: [
      {
        id: "romain-vin",
        client: "Romain",
        sector: "Négoce de vin",
        workflow: "Relance client",
        status: "pilot" as const,
        objective: "Premier euro attribuable sous 30 jours",
      },
    ] satisfies Credential[],
  },
  offering: {
    id: "offre",
    number: "06",
    label: "L'offre",
    headline: "Quatre étages — chacun vend le suivant",
    tiers: [
      {
        name: "Diagnostic",
        duration: "½ journée",
        description:
          "Observer le travail réel, cibler la douleur la plus coûteuse. Périmètre écrit à la fin.",
        price: "500 €",
      },
      {
        name: "Sprint Agent",
        duration: "2–3 semaines",
        description: "Codesign + pilote-preuve fail-fast. L'unité de preuve.",
        price: "~4 900 €",
        highlight: true,
      },
      {
        name: "Abonnement opérateur",
        duration: "Mensuel",
        description: "Copilote des équipes : nouveaux flux, adoption, mesure.",
        price: "1 500–3 000 €/mois",
      },
      {
        name: "Accélérateurs",
        duration: "Produit",
        description: "Patterns & playbooks réutilisables extraits des missions.",
        price: "Licence",
      },
    ],
  },
  cta: {
    id: "contact",
    headline: "Réserver un diagnostic",
    description:
      "Le problème, pas le secteur. Le codesign, pas la tech. La preuve, pas la production. Le transfert, pas la dépendance.",
    detail: "½ journée · 500 € · périmètre écrit à la fin",
    button: "Réserver un diagnostic",
    buttonHref:
      "mailto:contact@trame.co?subject=Diagnostic%20500%20%E2%82%AC",
    secondary: "écrire un mot",
    secondaryHref: "mailto:contact@trame.co",
    email: "contact@trame.co",
  },
  footer: {
    tagline:
      "On récupère les heures que vos tâches répétitives vous volent.",
  },
} as const;
```

- [ ] **Step 2: Commit**

```bash
git add apps/web/src/data/site.ts
git commit -m "Réécrire le contenu site pour la cible dirigeant PME."
```

---

### Task 3: Meta + Header + Footer

**Files:**
- Modify: `apps/web/src/app/layout.tsx`
- Modify: `apps/web/src/components/layout/Header.tsx`
- Modify: `apps/web/src/components/layout/Footer.tsx`

- [ ] **Step 1: Meta dans `layout.tsx`**

Remplacer `description` et OG :

```ts
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"
  ),
  title: "Trame — Révéler la trame du travail",
  description:
    "On récupère les heures que vos tâches répétitives vous volent. Diagnostic en demi-journée, preuve en 10 jours.",
  icons: {
    icon: [{ url: "/logo-mark.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Trame",
    description: "Révéler la trame du travail. La reconcevoir avec l'IA.",
    type: "website",
    locale: "fr_FR",
    images: [{ url: "/og-trame.svg", width: 1200, height: 630 }],
  },
};
```

- [ ] **Step 2: Header — nav depuis `siteContent.nav`, CTA diagnostic**

```tsx
"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { siteContent } from "@/data/site";

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
          {siteContent.nav.map((item) => (
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
          Réserver un diagnostic
        </a>
      </div>
    </header>
  );
}
```

Note : sur hero noir, le header transparent peut rendre le logo/nav peu lisibles. Si le Logo n’a pas de variante auto, laisser tel quel pour l’instant (comportement actuel sur scroll → fond os) OU forcer `Logo variant="light"` tant que `!scrolled`. Préférer : logo light + nav os quand `!scrolled`, puis logo dark quand scrolled (pattern déjà partiellement supporté via `Logo`).

Vérifier `Logo.tsx` — s’il expose `variant="light" | "dark"`, brancher :

```tsx
<Logo variant={scrolled ? "dark" : "light"} />
```

et classes nav :

```tsx
className={`font-label text-xs uppercase tracking-[0.14em] transition-colors ${
  scrolled
    ? "text-trame-muted hover:text-trame-black"
    : "text-trame-paper/60 hover:text-trame-paper"
}`}
```

- [ ] **Step 3: Footer**

```tsx
import { Logo } from "@/components/brand/Logo";
import { TrameWeave } from "@/components/brand/TrameWeave";
import { siteContent } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-trame-black px-[max(1.5rem,7vw)] py-16 text-trame-paper">
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
```

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/app/layout.tsx apps/web/src/components/layout/Header.tsx apps/web/src/components/layout/Footer.tsx
git commit -m "Mettre à jour meta, nav et footer pour le funnel diagnostic."
```

---

### Task 4: Hero noir

**Files:**
- Modify: `apps/web/src/components/sections/Hero.tsx`

- [ ] **Step 1: Réécrire Hero**

Fond noir, un CTA, accent sur un mot du sous-titre, pas de label « Cabinet · workflows cognitifs ».

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteContent } from "@/data/site";
import { TrameWeave } from "@/components/brand/TrameWeave";
import { Reveal } from "@/components/ui/Reveal";

function AccentSubheadline({ text, accentWord }: { text: string; accentWord: string }) {
  const idx = text.indexOf(accentWord);
  if (idx === -1) {
    return <span className="text-trame-paper">{text}</span>;
  }
  return (
    <>
      <span className="text-trame-paper">{text.slice(0, idx)}</span>
      <span className="text-trame-blue">{accentWord}</span>
      <span className="text-trame-paper">{text.slice(idx + accentWord.length)}</span>
    </>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const { hero } = siteContent;

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-trame-black pb-16 pt-28 text-trame-paper">
      <TrameWeave variant="black" opacity={0.55} />

      <div className="section-pad relative mx-auto w-full max-w-[90rem] pb-12 pt-16">
        <Reveal>
          <h1 className="display-title-xl max-w-[14ch] text-trame-paper">
            {hero.headline}
          </h1>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="font-display mt-4 max-w-[20ch] text-2xl md:text-4xl">
            <AccentSubheadline
              text={hero.subheadline}
              accentWord={hero.subheadlineAccentWord}
            />
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal delay={0.16}>
            <p className="max-w-md text-base leading-relaxed text-trame-paper/65">
              {hero.description}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <a href={hero.ctaHref} className="btn-primary">
              {hero.cta}
            </a>
          </Reveal>
        </div>

        {!reduced && (
          <motion.div
            className="absolute bottom-6 right-6 hidden md:block"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-trame-paper/40">
              Scroll
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
```

Vérifier que `TrameWeave` accepte `variant="black"`. Sinon utiliser la variante existante adaptée au fond sombre.

- [ ] **Step 2: Commit**

```bash
git add apps/web/src/components/sections/Hero.tsx
git commit -m "Repenser le hero pour le dirigeant (fond noir, CTA diagnostic)."
```

---

### Task 5: Section Pain (nouvelle)

**Files:**
- Create: `apps/web/src/components/sections/Pain.tsx`

- [ ] **Step 1: Créer le composant**

```tsx
import { siteContent } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Editorial";

export function Pain() {
  const { pain } = siteContent;

  return (
    <section id={pain.id} className="section-pad section-y bg-trame-os">
      <div className="mx-auto max-w-[90rem]">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="editorial-num" aria-hidden="true">
              {pain.number}
            </span>
            <SectionLabel>{pain.label}</SectionLabel>
          </div>
          <h2 className="display-title mt-4 max-w-[22ch] text-trame-black">
            {pain.question}
          </h2>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-trame-muted">
            {pain.headline}
          </p>
        </Reveal>

        <ul className="mt-20 border-t border-trame-filet">
          {pain.items.map((item, i) => (
            <Reveal key={item} delay={i * 0.06}>
              <li className="border-b border-trame-filet py-6 font-display text-xl text-trame-black md:text-2xl">
                {item}
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/web/src/components/sections/Pain.tsx
git commit -m "Ajouter la section douleur avec question de qualification."
```

---

### Task 6: Truth + Proposition + Method

**Files:**
- Modify: `apps/web/src/components/sections/Truth.tsx`
- Modify: `apps/web/src/components/sections/Proposition.tsx`
- Modify: `apps/web/src/components/sections/Method.tsx`

- [ ] **Step 1: Truth — fond os OU noir ; un seul accent (70 %)**

Garder fond noir (rythme) mais n’appliquer `text-trame-blue` qu’à l’item `accent: true`. Les autres en `text-trame-paper/40`. Barres : seule la barre du 70 % en ultramarine ; les autres en `bg-trame-paper/25`.

Structure :

```tsx
<span
  className={`font-display text-2xl md:text-3xl ${
    item.accent ? "text-trame-blue" : "text-trame-paper/40"
  }`}
>
  {item.value}%
</span>
// barre
className={`h-full ${item.accent ? "bg-trame-blue" : "bg-trame-paper/25"}`}
```

Ajouter numéro de section `truth.number` avec `aria-hidden` + label depuis data.

- [ ] **Step 2: Proposition — lire `methodBand` depuis data**

Remplacer la string hardcodée par `{proposition.methodBand}`. Ajouter numéro de section. Fond os (défaut).

- [ ] **Step 3: Method — numéros déjà `.editorial-num` (ultramarine après Task 1)**

Resserer : utiliser descriptions depuis `site.ts` (déjà resserrées). S’assurer `id="methode"`. Un seul accent = les numéros (pas de second bleu).

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/components/sections/Truth.tsx apps/web/src/components/sections/Proposition.tsx apps/web/src/components/sections/Method.tsx
git commit -m "Ajuster vérité, proposition et méthode (un accent, copy resserrée)."
```

---

### Task 7: Section Proof (nouvelle)

**Files:**
- Create: `apps/web/src/components/sections/Proof.tsx`

- [ ] **Step 1: Créer le composant credentials**

Fond noir, motif discret, une « carte » = filets (pas shadow). Mapper `proof.credentials`.

```tsx
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
            <span className="editorial-num" aria-hidden="true">
              {proof.number}
            </span>
            <SectionLabel light>{proof.label}</SectionLabel>
          </div>
          <h2 className="display-title mt-4 max-w-[14ch] text-trame-paper">
            {proof.headline}
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-trame-paper/55">
            {proof.description}
          </p>
        </Reveal>

        <div className="mt-20 border-t border-trame-paper/15">
          {proof.credentials.map(( cred, i) => (
            <Reveal key={cred.id} delay={i * 0.08}>
              <article className="grid gap-6 border-b border-trame-paper/15 py-10 md:grid-cols-[1fr_1.2fr_auto]">
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.16em] text-trame-paper/45">
                    {cred.status === "pilot" ? "Pilote en cours" : "Mission"}
                  </p>
                  <h3 className="font-display mt-3 text-2xl text-trame-paper">
                    {cred.client}
                  </h3>
                  <p className="mt-2 text-sm text-trame-paper/55">{cred.sector}</p>
                </div>
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.16em] text-trame-paper/45">
                    Workflow
                  </p>
                  <p className="mt-3 text-lg text-trame-paper">{cred.workflow}</p>
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
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Règle accent : si `metric` présent → ultramarine sur le chiffre uniquement ; sinon aucun bleu dans la carte (statut en os atténué). Avec le pilote actuel (pas de metric), zéro bleu dans le corps — le numéro de section porte l’accent.

- [ ] **Step 2: Commit**

```bash
git add apps/web/src/components/sections/Proof.tsx
git commit -m "Ajouter la section preuve avec credential pilote."
```

---

### Task 8: Offering + CTA

**Files:**
- Modify: `apps/web/src/components/sections/Offering.tsx`
- Modify: `apps/web/src/components/sections/CTA.tsx`

- [ ] **Step 1: Offering — fond os (pas noir), prix depuis data**

```tsx
import { siteContent } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Editorial";

export function Offering() {
  const { offering } = siteContent;

  return (
    <section id={offering.id} className="section-pad section-y bg-trame-os">
      <div className="mx-auto max-w-[90rem]">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="editorial-num" aria-hidden="true">
              {offering.number}
            </span>
            <SectionLabel>{offering.label}</SectionLabel>
          </div>
          <h2 className="display-title mt-4 max-w-[16ch] text-trame-black">
            {offering.headline}
          </h2>
        </Reveal>

        <div className="mt-16 border-t border-trame-filet">
          {offering.tiers.map((tier, i) => {
            const highlighted = "highlight" in tier && tier.highlight;
            return (
              <Reveal key={tier.name} delay={i * 0.06}>
                <div
                  className={`menu-row border-trame-filet ${
                    highlighted ? "border-l-2 border-l-trame-blue pl-4 -ml-px" : ""
                  }`}
                >
                  <div>
                    <p className="font-label text-[10px] uppercase tracking-[0.16em] text-trame-muted">
                      {tier.duration}
                      {highlighted && (
                        <span className="ml-3 text-trame-blue">
                          · Cœur de l&apos;offre
                        </span>
                      )}
                    </p>
                    <h3 className="font-display mt-2 text-xl text-trame-black md:text-2xl">
                      {tier.name}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm text-trame-muted">
                      {tier.description}
                    </p>
                  </div>
                  <p
                    className={`font-display shrink-0 text-2xl md:text-3xl ${
                      highlighted ? "text-trame-blue" : "text-trame-black"
                    }`}
                  >
                    {tier.price}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

Accent unique : le Sprint (label + prix). Pas de second bloc bleu.

Mettre à jour `.menu-row` dans `globals.css` si besoin pour bordures filet sur fond os :

```css
.menu-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: baseline;
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--trame-filet-clair);
}
```

- [ ] **Step 2: CTA — fond noir (plus bleu plein)**

```tsx
import { siteContent } from "@/data/site";
import { TrameWeave } from "@/components/brand/TrameWeave";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  const { cta } = siteContent;

  return (
    <section
      id={cta.id}
      className="relative overflow-hidden bg-trame-black section-pad section-y text-trame-paper"
    >
      <TrameWeave variant="black" opacity={0.4} />

      <div className="relative mx-auto max-w-[90rem]">
        <Reveal>
          <h2 className="display-title max-w-[14ch] text-trame-paper">
            {cta.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-trame-paper/70">
            {cta.description}
          </p>
          <p className="font-label mt-4 text-xs uppercase tracking-[0.14em] text-trame-paper/45">
            {cta.detail}
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <a href={cta.buttonHref} className="btn-primary">
              {cta.button}
            </a>
            <a
              href={cta.secondaryHref}
              className="font-label text-xs uppercase tracking-[0.14em] text-trame-paper/50 underline-offset-4 transition-colors hover:text-trame-paper hover:underline"
            >
              {cta.secondary}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/components/sections/Offering.tsx apps/web/src/components/sections/CTA.tsx apps/web/src/app/globals.css
git commit -m "Aligner offre PME et CTA diagnostic sur fond noir."
```

---

### Task 9: Assembler `page.tsx` + supprimer orphelins

**Files:**
- Modify: `apps/web/src/app/page.tsx`
- Delete: `apps/web/src/components/sections/Problem.tsx`
- Delete: `apps/web/src/components/sections/Workflows.tsx`
- Delete: `apps/web/src/components/sections/Pains.tsx`
- Delete: `apps/web/src/components/sections/Positioning.tsx`

- [ ] **Step 1: Remplacer `page.tsx`**

```tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Pain } from "@/components/sections/Pain";
import { Truth } from "@/components/sections/Truth";
import { Proposition } from "@/components/sections/Proposition";
import { Method } from "@/components/sections/Method";
import { Proof } from "@/components/sections/Proof";
import { Offering } from "@/components/sections/Offering";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pain />
        <Truth />
        <Proposition />
        <Method />
        <Proof />
        <Offering />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Supprimer les 4 sections orphelines**

```bash
rm apps/web/src/components/sections/Problem.tsx \
   apps/web/src/components/sections/Workflows.tsx \
   apps/web/src/components/sections/Pains.tsx \
   apps/web/src/components/sections/Positioning.tsx
```

- [ ] **Step 3: Build**

```bash
cd apps/web && npm run build
```

Expected: build Next.js réussi, 0 erreur TypeScript.

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/app/page.tsx
git add -u apps/web/src/components/sections/
git commit -m "Réordonner la home et retirer les sections investisseur."
```

---

### Task 10: Audit visuel DoD + polish

**Files:** éventuellement petits ajustements CSS/composants

- [ ] **Step 1: Checklist manuelle**

Parcourir chaque section et vérifier :
1. Un seul accent ultramarine par viewport
2. Pas de shadow / cards rounded
3. Pas de « workflow cognitif » / buzzwords dans les titres visibles
4. Question de qualification lisible
5. Prix : 500 € / ~4 900 € / 1 500–3 000 €
6. CTA cohérent
7. Mobile : nav CTA lisible, sections empilées

- [ ] **Step 2: Lint + build final**

```bash
cd apps/web && npm run lint && npm run build
```

Expected: PASS

- [ ] **Step 3: Commit polish si besoin**

```bash
git add -A apps/web
git commit -m "Peaufiner l'alignement charte après audit visuel."
```

(Skip si rien à committer.)

---

## Spec coverage (self-review)

| Spec requirement | Task |
|---|---|
| Tokens charte | Task 1 |
| Contenu dirigeant | Task 2 |
| Nav + meta + footer | Task 3 |
| Hero noir + CTA | Task 4 |
| Question qualification + douleurs | Task 5 |
| Vérité 70% un accent | Task 6 |
| Proposition antithèse | Task 6 |
| Méthode 4 étapes | Task 6 |
| Preuve / credentials | Task 7 |
| Offre prix PME | Task 8 |
| CTA noir + secondaire | Task 8 |
| Retrait quadrant / Problem / Workflows / Pains | Task 9 |
| DoD audit | Task 10 |
| OG vérifié (déjà conforme) | Task 3 (pas de rebuild) |

Pas de placeholders TBD dans les steps. Types `Credential` / `status` cohérents Tasks 2 ↔ 7.
