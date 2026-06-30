export const siteContent = {
  meta: {
    title: "Trame",
    tagline: "Révéler la trame du travail. La reconcevoir avec l'IA.",
  },
  hero: {
    headline: "Révéler la trame du travail",
    subheadline: "La reconcevoir avec l'IA.",
    description:
      "Cabinet de transformation des workflows cognitifs — codesign, preuve rapide, transfert aux équipes.",
  },
  problem: {
    headline: "Tout le monde teste l'IA. Presque personne n'en tire de la valeur.",
    stats: [
      { value: "88%", label: "des pilotes d'agents ne passent jamais en production" },
      { value: "40%+", label: "des projets agentiques annulés d'ici 2027" },
    ],
    insight:
      "Cause n°1 : chercher un problème à résoudre avec l'IA, au lieu de partir d'une vraie douleur métier.",
  },
  truth: {
    headline: "La valeur n'est pas dans la techno. Elle est dans le travail.",
    breakdown: [
      { label: "Algorithmes", value: 10 },
      { label: "Tech & données", value: 20 },
      { label: "Personnes & process", value: 70 },
    ],
    quote: "Une révolution industrielle pour le travail de la connaissance",
    source: "Bain & Company",
  },
  proposition: {
    headline: "Nous ne vendons pas de l'IA. Nous vendons ses effets.",
    not: ["Des agents", "Des prompts", "De l'automatisation", "De la tech à intégrer"],
    but: [
      "Du temps gagné",
      "Une charge cognitive réduite",
      "Une meilleure capacité d'exécution",
      "Une adoption réussie",
    ],
  },
  workflows: {
    headline: "Les workflows cognitifs",
    description:
      "Le travail de la connaissance : penser, analyser, décider, produire. On se positionne sur un type de problème, pas sur un secteur.",
    items: [
      "Recherche & veille",
      "Analyse & synthèse",
      "Recommandations",
      "Préparation de décisions",
      "Coordination & livrables",
      "Création de connaissances",
    ],
  },
  pains: {
    headline: "Des douleurs concrètes, chiffrées",
    items: [
      { workflow: "Appels d'offres", before: "3 jours par pitch", after: "une demi-journée" },
      { workflow: "Reporting campagnes", before: "2 jours/mois", after: "2 heures" },
      { workflow: "Verbatims clients", before: "des semaines", after: "un jour" },
      { workflow: "Veille concurrence", before: "éparpillée", after: "synthèse hebdo" },
    ],
  },
  method: {
    headline: "Du travail réel à la preuve",
    subtitle: "Puis on passe la main.",
    steps: [
      {
        id: "comprendre",
        number: "01",
        title: "Comprendre",
        description: "Observer le travail réel, les douleurs, l'usage. Pas le process théorique.",
      },
      {
        id: "codesign",
        number: "02",
        title: "Codesign",
        description: "Concevoir le workflow cible avec les équipes. L'adoption s'intègre ici.",
      },
      {
        id: "pilote",
        number: "03",
        title: "Pilote-preuve",
        description: "Test-and-learn, fail-fast, faible coût. Démontrer la valeur, vite.",
      },
      {
        id: "transfert",
        number: "04",
        title: "Transfert & mesure",
        description: "Passer la main pour l'industrialisation. Mesurer le ROI.",
      },
    ],
  },
  offering: {
    headline: "Quatre étages — chacun vend le suivant",
    tiers: [
      {
        name: "Discovery & cadrage",
        duration: "1 semaine",
        description: "Observer le travail réel, cibler le workflow le plus douloureux.",
        price: "3–6 k€",
      },
      {
        name: "Workflow Transformation Sprint",
        duration: "2–3 semaines",
        description: "Codesign + pilote-preuve fail-fast. L'unité de preuve.",
        price: "12–20 k€",
        highlight: true,
      },
      {
        name: "Operating Partner",
        duration: "Abonnement",
        description: "Copilote IA des équipes : nouveaux workflows, adoption, mesure.",
        price: "3–6 k€/mois",
      },
      {
        name: "Accélérateurs",
        duration: "Produit",
        description: "Patterns & playbooks réutilisables extraits des missions.",
        price: "Licence",
      },
    ],
  },
  positioning: {
    headline: "L'espace ouvert est en haut à droite",
    description:
      "Codesign + cognitif existe chez les géants (chers) ou les firmes de design (absorbées). Le quadrant cognitif × codesign au niveau mid-market est vide.",
    principles: [
      { title: "Par problème", detail: "workflows cognitifs × par secteur" },
      { title: "Codesign & adoption", detail: "le différenciateur × la tech" },
      { title: "Preuve cheap, fail-fast", detail: "de-risking × la production" },
      { title: "Transfert aux équipes", detail: "complémentarité × la dépendance" },
    ],
  },
  cta: {
    headline: "Prêt à révéler la trame de votre travail ?",
    description: "Le problème, pas le secteur. Le codesign, pas la tech. La preuve, pas la production.",
    button: "Planifier une conversation",
    email: "contact@trame.co",
  },
} as const;
