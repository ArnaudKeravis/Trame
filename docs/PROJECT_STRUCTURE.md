# Structure du projet Trame

```
Trame/
├── README.md                    # Point d'entrée du repo
├── .gitignore
│
├── docs/                        # Documentation stratégique & produit
│   ├── PRODUCT_VISION.md        # Vision produit complète
│   ├── POSITIONING.md           # Positionnement & carte concurrentielle
│   ├── OFFERING.md              # Offre commerciale détaillée
│   ├── METHODOLOGY.md           # Méthode 4 phases + Trame OS
│   ├── MARKET_BENCHMARK.md      # Benchmark marché & références web
│   ├── GO_TO_MARKET.md          # GTM, beachhead, trajectoire
│   ├── DESIGN_INSPIRATION.md    # Direction créative site vitrine
│   ├── PROJECT_STRUCTURE.md     # Ce fichier
│   └── source/                  # Documents sources
│       └── Trame_PropositionValeur_V10726.pdf
│
├── brand/                       # Identité de marque
│   └── identity.md              # Nom, promesse, ton, visuels
│
├── content/                     # Contenus éditoriaux (hors code)
│   ├── copy/
│   │   └── site.fr.yaml         # Copy du site vitrine
│   └── workflows/
│       └── pain-points.md       # Douleurs par workflow
│
├── apps/
│   └── web/                     # Site vitrine Next.js (parallax)
│       ├── src/
│       │   ├── app/             # App Router
│       │   ├── components/      # UI & sections
│       │   └── lib/             # Utils, hooks scroll
│       └── public/              # Assets statiques
│
└── internal/                    # Ressources internes (non client)
    └── trame-os/                # Trame OS — agents & playbooks (futur)
        └── README.md
```

## Rôles des dossiers

| Dossier | Usage |
|---------|-------|
| `docs/` | Vision, stratégie, specs — source de vérité business |
| `brand/` | Guidelines identité, à enrichir (logo, palette finale) |
| `content/` | Textes réutilisables (site, one-pagers, pitch) |
| `apps/web/` | Produit public : site vitrine |
| `internal/` | Outils internes, Trame OS — jamais exposé client |

## Conventions

- **Langue** : français pour contenu business et site ; anglais OK pour code
- **Docs** : Markdown, liens relatifs entre fichiers
- **Copy** : YAML structuré pour faciliter l'i18n future
- **Secrets** : jamais dans le repo — `.env.local` pour `apps/web`

## Évolutions prévues

| Phase | Ajout |
|-------|-------|
| **Actuelle** | Docs + socle web |
| **2** | Site parallax complet, sections offre & méthode |
| **3** | One-pager Sprint PDF généré depuis `content/` |
| **4** | `internal/trame-os/` — agents & playbooks |
| **5** | Accélérateurs packagés (produit) |
