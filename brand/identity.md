# Identité Trame — v1

Identité visuelle alignée sur le deck pitch 2026. Registre **Fjord/Song** : poster éditorial, mono-couleur franche, asymétrie assumée.

## Nom

**Trame** — la structure sous-jacente d'un tissu, d'un récit, d'un process.

## Promesse

> Révéler la trame du travail. La reconcevoir avec l'IA.

## Palette

| Token | Hex | Usage |
|-------|-----|-------|
| **Noir chaud** | `#131012` | Texte, headers, fonds statement |
| **Papier os** | `#ECE7DD` | Fond principal, respiration |
| **Ultramarine électrique** | `#2C2BE8` | Chiffres, accents, CTA, nœuds du motif |

> Abandon du corail/teal (v0). Une mono-couleur franche et premium.

## Typographie

| Rôle | Police | Usage |
|------|--------|-------|
| **Display** | Archivo Black (900) | Titres XXL, chiffres géants, wordmark TRAME |
| **Label** | Space Grotesk | Sous-titres, labels, navigation, menus |
| **Corps** | Arial | Texte courant, neutre |

## Motif « Trame »

Grille tissée : lignes fines + **nœuds ultramarine en diagonale** — matérialise le nom.

Assets : [`assets/logo-mark.svg`](./assets/logo-mark.svg) · [`assets/logo.svg`](./assets/logo.svg) · [`assets/weave-pattern.svg`](./assets/weave-pattern.svg)

## Principes de mise en page (deck → web)

| Pattern deck | Application web |
|--------------|-----------------|
| Slides statement pleine page | Hero, 88% géant, CTA en aplat bleu |
| Colonnes éditoriales 01–04 | Méthode, implications, GTM |
| Data-viz franche 70/20/10 | Section vérité, barres pleine largeur |
| Offre en menu typographique | Liste à filets sur fond noir |
| Tableaux à filets fins | Douleurs avant/après |
| Asymétrie + titres calés à gauche | Grilles asymétriques, vide assumé |

## Logo & wordmark

- **Mark** : grille 3×3 + nœuds diagonaux bleu
- **Wordmark** : TRAME en Archivo Black, tracking serré
- Fichiers : `logo.svg`, `logo-mark.svg`

## Assets produits

- [x] Logo mark (SVG)
- [x] Logo complet (SVG)
- [x] Motif tissé (SVG pattern)
- [x] Favicon (`apps/web/src/app/icon.svg`)
- [x] Apple touch icon
- [x] Open Graph (`apps/web/public/og-trame.svg`)
- [ ] Template one-pager Sprint
- [ ] Export deck PowerPoint/PDF

## Ton de voix

| Faire | Éviter |
|-------|--------|
| Effets chiffrés (temps gagné) | Jargon IA (agents, RAG) |
| Lucidité (on s'arrête à la preuve) | Hype disruption |
| Codesign, humain | Gradients néon « AI startup » |

## Implémentation web

Site : `apps/web/` — tokens CSS `--trame-black`, `--trame-paper`, `--trame-blue`

```bash
cd apps/web && npm run dev
```
