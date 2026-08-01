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
