# Inspiration design — Site vitrine Trame

Document de direction créative pour `apps/web`.

## Positionnement visuel

**Cabinet conseil premium × startup fail-fast** — pas une agence tech, pas un SaaS.

| Attribut | Direction |
|----------|-----------|
| Ton | Lucide, expert, humain — jamais « hype IA » |
| Rythme | Scrollytelling parallax, révélations progressives |
| Couleurs | Palette sobre + accent « trame » (fil, structure, tissage) |
| Typo | Serif élégante (titres) + sans moderne (corps) — distinction conseil |
| Motion | Parallax subtil, `prefers-reduced-motion` respecté |
| Densité | Aéré, beaucoup de blanc — comme un cabinet, pas un dashboard |

## Références analysées

### Cabinets & conseil

| Site | URL | Pattern à reprendre |
|------|-----|---------------------|
| **IDEO** | ideo.com | Sections numérotées, human-centered, CTA conversationnel |
| **frog** | frog.co | Principes fondateurs, insights, work grid |
| **McKinsey Digital** | mckinsey.com | Crédibilité, data points, structure éditoriale |

### Startups & scrollytelling

| Site | Pattern |
|------|---------|
| **Notpla** | Parallax organique, textures, narration purpose-led |
| **Fiddle.Digital** | Scroll cinématique, performance-first (StringTune) |
| **Apple product pages** | Parallax produit, révélation couche par couche |
| **Neverland Studio** | Onirique, process créatif en scroll |

### Ce qu'on évite

- Gradients néon « AI startup »
- Illustrations 3D robots / cerveaux
- Jargon technique (agents, LLM, RAG) en hero
- Animations excessives qui nuisent au LCP

## Architecture narrative du site (one-page scroll)

```
1. HERO          « Révéler la trame du travail »
2. PROBLÈME       88% des pilotes échouent — la douleur
3. VÉRITÉ         70% personnes & process
4. TERRAIN        6 workflows cognitifs (grille interactive)
5. DOULEURS       Avant/après chiffrés (parallax cards)
6. MÉTHODE        4 étapes — scrollytelling horizontal
7. OFFRE          4 étages — pricing cards
8. POSITIONNEMENT Quadrant cognitif × codesign
9. POURQUOI NOUS  Conseil × Production
10. CTA           Contact / Discovery call
```

## Stack technique recommandée

| Couche | Choix | Raison |
|--------|-------|--------|
| Framework | Next.js 15 (App Router) | SEO, perf, déploiement Vercel |
| Styling | Tailwind CSS 4 | Tokens, responsive |
| Motion | Framer Motion | Scroll-triggered, accessible |
| Smooth scroll | Lenis | Fluidité sans lourdeur Locomotive |
| Parallax | CSS `transform` + Framer | GPU-accelerated, perf |
| Contenu | YAML/MD dans `content/` | Séparation copy / code |

## Tokens design (proposition)

```css
/* À affiner dans apps/web */
--trame-ink: #1a1a1f;        /* Texte principal */
--trame-paper: #f7f5f2;      /* Fond chaud */
--trame-thread: #c4a882;     /* Fil / accent trame */
--trame-weave: #2d4a3e;      /* Vert profond — structure */
--trame-muted: #6b6b73;      /* Texte secondaire */
```

## Principes d'accessibilité

- `prefers-reduced-motion: reduce` → désactiver parallax
- Contraste WCAG AA minimum
- Navigation clavier sur toutes les sections
- Contenu lisible sans JavaScript (progressive enhancement)

## Prochaine itération design

1. Maquettes Figma (optionnel) — section hero + méthode
2. Implémentation hero + problème + méthode
3. Animations parallax sur section douleurs
4. Formulaire contact / Calendly
5. Mode sombre (optionnel phase 2)
