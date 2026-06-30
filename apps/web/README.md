# Trame — Site vitrine

Site marketing one-page avec scrollytelling parallax.

## Stack

- Next.js 15 (App Router)
- Tailwind CSS 4
- Framer Motion (animations scroll)
- Lenis (smooth scroll)

## Développement

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
├── app/           # Layout & page
├── components/
│   ├── layout/    # Header, Footer
│   ├── sections/  # Sections one-page
│   ├── ui/        # Reveal, ParallaxLayer
│   └── providers/ # SmoothScroll
└── data/
    └── site.ts    # Contenu (miroir de content/copy/site.fr.yaml)
```

## Contenu

Le copy source vit dans `../../content/copy/site.fr.yaml`.  
`src/data/site.ts` est la version consommée par l'app — à synchroniser lors des edits.

## Accessibilité

- `prefers-reduced-motion` désactive parallax et smooth scroll
- Contraste WCAG sur palette Trame

## Déploiement

Compatible Vercel :

```bash
npm run build
```
