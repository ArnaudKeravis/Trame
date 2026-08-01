# Spec — Refonte site Trame (cible dirigeant PME)

Date : 2026-08-01  
Statut : validé en discussion (architecture, visuelle, technique)  
Approche : **A — refonte contenu + structure** sur la stack existante (Next.js + Tailwind)

## Objectif

Transformer la landing single-page actuelle (trop stratégique / investisseur) en site vitrine pour un **dirigeant de PME 5–50 personnes qui vend lui-même**. En 5 secondes, il doit comprendre ce que Trame lui enlève de son quotidien, sans le mot « agent » ni « workflow cognitif » en titre.

Trois axes : identité visuelle (charte à la lettre), contenu (douleur chiffrée), stratégie (preuve + diagnostic 500 €).

## Décisions actées

| Sujet | Décision |
|---|---|
| Approche | A — réécrire contenu, réordonner sections, réutiliser composants UI |
| Funnel contact | Ancre `#contact` + mailto `contact@trame.co` |
| CTA primaire | « Réserver un diagnostic » → `#contact` |
| CTA secondaire | « écrire un mot » → mailto (sujet message libre) |
| E-mail | `contact@trame.co` (inchangé pour l’instant) |
| Preuve | 1 credential honnête « pilote en cours » (Romain), architecture 1→N |
| Hors scope | Calendly, cookies/trackers, photos, rebuild framer-motion |

## Architecture de page

Nav : **Douleur · Méthode · Preuve · Offre · Contact**  
Header CTA : « Réserver un diagnostic » → `#contact`

| # | Section | Fond | Notes |
|---|---|---|---|
| 1 | Hero | Noir | Motif coin, H1 « Révéler la trame du travail. » + accent ultramarine sur un mot de « La reconcevoir avec l'IA. ». Sous-titre concret. Un CTA. |
| 2 | Douleur | Os | Question de qualification en grand. 4 douleurs nommées (relances, AO, devis, reporting). |
| 3 | Vérité | Os ou noir | 70 % / 20 % / 10 % Bain — un seul grand chiffre ultramarine (70 %). Filets, pas cartes. |
| 4 | Proposition | Os | Pas ça / Mais ça. Bande méthode : Comprendre → codesign → pilote fail-fast → transfert. |
| 5 | Méthode | Os | 4 étapes, filets verticaux, numéros ultramarine. Texte resserré. |
| 6 | Preuve | Noir | Credentials. En attendant : pilote Romain (négoce vin, relance, 1er € sous 30 j). |
| 7 | Offre | Os | 4 étages en filets. Prix PME. Sprint = « cœur de l'offre ». |
| 8 | CTA final | Noir | Antithèse signature + CTA diagnostic + secondaire « écrire un mot ». |
| 9 | Footer | Noir | Wordmark, phrase en une ligne, © 2026 Trame. |

### Sections à retirer

- `Problem` (stats 88 % / 40 % orientées marché)
- `Workflows` (vocabulaire interne)
- `Pains` (grille avant/après générique — remplacée par Douleur + Preuve)
- `Positioning` (quadrant stratégique / TAM — réservé au deck)

Les 4 partis pris peuvent survivre reformulés côté bénéfice client (dans Proposition ou CTA), jamais comme carte concurrentielle.

## Contenu cible (voix)

**Principe :** « Workflows cognitifs » = interne. Le site parle douleur chiffrée.

### Hero

- H1 : Révéler la trame du travail.
- Ligne 2 : La reconcevoir avec l'IA. (un mot en ultramarine)
- Description : On récupère les heures que vos tâches répétitives vous volent — un système qui tourne en 10 jours.
- CTA : Réserver un diagnostic

### Douleur

- Question (forte) : Combien de temps passez-vous chaque semaine sur vos relances, vos appels d'offres ou vos devis ?
- Items (langage dirigeant) :
  - Les relances qu'on n'a pas le temps de faire
  - Les appels d'offres qu'on refait chaque année
  - Les devis qui s'accumulent
  - Le reporting du dimanche soir

### Vérité

- Garder 70 % personnes & process / 20 % tech & données / 10 % algorithmes (Bain)
- Un seul accent ultramarine : le 70 %

### Proposition

- Garder antithèse Pas ça / Mais ça (agents, prompts… → temps gagné, charge cognitive…)
- Reformuler le headline si besoin pour éviter le jargon investisseur
- Bande méthode sous les colonnes

### Méthode

- 01 Comprendre · 02 Codesign · 03 Pilote-preuve · 04 Transfert & mesure
- Textes plus courts, même structure

### Preuve (nouveau)

Structure credential (prête pour N) :

```
{
  id, client, sector, workflow,
  before?, after?, metric?,
  quote?, status: "pilot" | "done"
}
```

Credential initial :

- Client : Romain
- Secteur : négoce de vin
- Workflow : agent de relance client
- Statut : pilote en cours
- Objectif : premier euro attribuable sous 30 jours
- Pas de faux logos, pas de grille vide

### Offre (prix PME)

| Étage | Prix | Note |
|---|---|---|
| Diagnostic | 500 € | ½ journée, périmètre écrit à la fin |
| Sprint Agent | ~4 900 € | **Cœur de l'offre** |
| Abonnement opérateur | 1 500–3 000 €/mois | |
| Accélérateurs | Licence | |

### CTA final

- Antithèse : Le problème, pas le secteur. Le codesign, pas la tech. La preuve, pas la production. Le transfert, pas la dépendance.
- Bouton : Réserver un diagnostic → `mailto:contact@trame.co?subject=Diagnostic%20500%20%E2%82%AC`
- Lien secondaire : écrire un mot → `mailto:contact@trame.co`

### Meta / OG

- Description orientée dirigeant (heures récupérées), pas « cabinet de transformation des workflows cognitifs »
- OG existant (`/og-trame.svg`) déjà conforme (noir + wordmark + motif) — vérifier, pas refaire sauf écart charte

## Identité visuelle

### Tokens (`globals.css`)

```css
:root {
  --trame-noir: #131012;
  --trame-os: #ECE7DD;
  --trame-papier: #F6F3EC;
  --trame-ultramarine: #2C2BE8;
  --trame-ultra-tint: #DAD9F7;
  --trame-gris-chaud: #86837C;
  --trame-gris-froid: #9D9BA8;
  --trame-filet-clair: #D4CEC1;
  --trame-filet-sombre: #35322C;
  --trame-marge: 7vw;
}
```

Aliases Tailwind : mapper `trame-black` → noir, `trame-paper` → os (ou introduire `trame-os` / `trame-papier` sans casser les classes existantes).

### Règles non négociables

1. Un seul accent ultramarine fort par viewport (90/10)
2. Titres Archivo Black, calés à gauche, XXL — ponctuer un mot, pas colorer le titre entier
3. Filets 0,75–1 px, zéro carte à ombre / border-radius corporate
4. Marges ≥ 7 % largeur
5. Rythme sombre / clair comme tableau architecture
6. Numéros de section `01`… Archivo Black ultramarine (`aria-hidden`)
7. Motif trame discret (coins), jamais texture pleine derrière texte
8. Pas d’imagerie robot IA ; défaut = typo + motif
9. Accessibilité : os↔noir AAA ; ultramarine sur os seulement ≥ 18 px

**Changement CTA actuel :** le bloc CTA plein ultramarine → fond **noir**, bouton ultramarine (un seul accent).

## Exécution technique

### Fichiers

| Action | Fichier |
|---|---|
| Réécrire | `apps/web/src/data/site.ts` |
| Réordonner | `apps/web/src/app/page.tsx` |
| Tokens | `apps/web/src/app/globals.css` |
| Meta | `apps/web/src/app/layout.tsx` |
| Nav / CTA | `Header.tsx`, `Footer.tsx` |
| Adapter | `Hero.tsx`, `Truth.tsx`, `Proposition.tsx`, `Method.tsx`, `Offering.tsx`, `CTA.tsx` |
| Créer | `Pain.tsx` (douleur + question), `Proof.tsx` (credentials) |
| Supprimer usages | `Problem.tsx`, `Workflows.tsx`, `Pains.tsx`, `Positioning.tsx` (fichiers orphelins OK à supprimer) |

### Contenu centralisé

Tout le copy reste dans `site.ts`. Les sections restent des présentations minces.

### Accessibilité & perf

- Un seul H1 (hero) ; sections en H2
- Numéros décoratifs `aria-hidden`
- Respect `prefers-reduced-motion` (déjà via Reveal / Hero)
- Pas de nouvelle lib d’animation
- Pas de cookie banner / tracker

## Definition of done

- [ ] Dirigeant non-tech comprend en 5 s ce que Trame lui enlève, sans « agent »
- [ ] Un seul accent ultramarine par section (audit visuel)
- [ ] Zéro carte à ombre : filets uniquement
- [ ] Zéro buzzword blacklist + zéro visuel robot IA
- [ ] Section preuve avec pilote en cours, extensible 1→N
- [ ] CTA unique cohérent : réserver le diagnostic (500 €)
- [ ] Question de qualification visible et lisible
- [ ] Prix alignés PME
- [ ] Quadrant / vocabulaire investisseur retirés
- [ ] Mobile-first ; viser Lighthouse ≥ 95 perf/a11y

## Hors scope explicite

Calendly, formulaires custom, analytics, photos stock, redesign du mark SVG, deck investisseur, backend.
