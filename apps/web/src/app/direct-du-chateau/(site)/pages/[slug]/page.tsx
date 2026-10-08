import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LocalForm } from "@/components/clients/direct-du-chateau/LocalForm";
import {
  BASE,
  productsByVendor,
  shopCollection,
  SHOP,
  wineVendors,
} from "@/components/clients/direct-du-chateau/catalog";

const pages = {
  "nos-partenaires": {
    title: "Familles de vignerons et domaines | Direct Du Château",
    description:
      "Rencontrez les familles de vignerons et les domaines présentés par Direct Du Château. Découvrez leurs histoires et les cuvées associées à chaque producteur.",
    h1: "Nos familles de vignerons",
  },
  "frais-de-port": {
    title: "Livraison et frais de port | Direct Du Château",
    description:
      "Consultez les modalités de livraison Direct Du Château : expédition depuis Castillon-la-Bataille, seuil de 36 bouteilles et calcul des frais sous ce seuil.",
    h1: "Livraison et frais de port",
  },
  "compte-professionnel": {
    title: "Demander un compte professionnel | Direct Du Château",
    description:
      "Restaurateur, caviste ou commerçant ? Découvrez comment demander un accès professionnel à Direct Du Château et retrouver les informations pour votre activité.",
    h1: "Demander un compte professionnel",
  },
  contact: {
    title: "Contacter l’équipe Direct Du Château | Vins professionnels",
    description:
      "Une question sur une cuvée, votre compte professionnel ou une commande ? Retrouvez les coordonnées de Direct Du Château et envoyez votre demande à l’équipe.",
    h1: "Contacter Direct Du Château",
  },
  "vins-pour-restaurateurs": {
    title: "Vins de propriétés pour restaurateurs | Direct Du Château",
    description:
      "Explorez des vins de propriétés pour votre restaurant : cuvées, domaines et informations de commande chez Direct Du Château. Découvrez la sélection disponible.",
    h1: "Des vins de propriétés pour votre restaurant",
  },
  "vins-pour-cavistes": {
    title: "Vins de vignerons pour cavistes | Direct Du Château",
    description:
      "Découvrez les vins et les familles de vignerons présentés par Direct Du Château pour les cavistes. Explorez les cuvées et leurs domaines.",
    h1: "Des vins et des histoires de vignerons pour cavistes",
  },
} as const;

type PageSlug = keyof typeof pages;

function isPageSlug(value: string): value is PageSlug {
  return value in pages;
}

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isPageSlug(slug)) return {};
  const page = pages[slug];
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `${BASE}/pages/${slug}` },
    robots: { index: false, follow: false },
  };
}

const previewNotice =
  "Cette prévisualisation n’envoie rien. Lorsque l’envoi sera branché, le message prévu est : « Votre demande a été envoyée. Pour une question concernant votre accès, contactez l’équipe Direct Du Château. » Aucun délai n’est indiqué.";

export default async function EditorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isPageSlug(slug)) notFound();
  const page = pages[slug];

  return (
    <main id="contenu" className="ddc-wrap ddc-section">
      <h1 className="ddc-display max-w-[18ch] text-5xl sm:text-6xl">{page.h1}</h1>
      <PageBody slug={slug} />
    </main>
  );
}

function PageBody({ slug }: { slug: PageSlug }) {
  if (slug === "nos-partenaires") return <Partners />;
  if (slug === "frais-de-port") return <Shipping />;
  if (slug === "compte-professionnel") return <Account />;
  if (slug === "contact") return <Contact />;
  if (slug === "vins-pour-restaurateurs") return <Restaurants />;
  return <Cavistes />;
}

function Partners() {
  const domains = wineVendors().map((vendor) => ({
    vendor,
    count: productsByVendor(vendor).filter((product) => product.family === "vin").length,
  }));

  return (
    <>
      <p className="ddc-measure mt-6 text-lg">
        Derrière chaque cuvée, il y a un domaine de la sélection. Les histoires, les lieux et les photos de familles ne
        sont pas affichés&nbsp;: ils ne sont pas vérifiés. Les noms ci-dessous viennent du catalogue public observé le
        7&nbsp;octobre 2026.
      </p>
      <h2 id="domaines" className="ddc-display mt-12 text-4xl">
        Les domaines de la sélection
      </h2>
      <ul className="ddc-domains mt-6">
        {domains.map((domain) => (
          <li key={domain.vendor}>
            <span className="font-medium">{domain.vendor}</span>
            <a className="underline underline-offset-4" href={`${SHOP}/search?q=${encodeURIComponent(domain.vendor)}`}>
              Voir les vins du domaine
              <span className="sr-only"> {domain.vendor}</span>
            </a>
            <span className="text-sm text-[var(--ddc-muted)]">
              {domain.count} référence{domain.count > 1 ? "s" : ""} au catalogue observé
            </span>
          </li>
        ))}
      </ul>
      <h2 className="ddc-display mt-12 text-4xl">Leurs vins</h2>
      <p className="ddc-measure mt-4">
        Les fiches, les millésimes et les conditions de commande sont sur la boutique. Cette page ne recopie ni les prix
        ni les stocks.
      </p>
      <a className="ddc-button inline-flex mt-6" href={shopCollection("frontpage")}>
        Explorer tous les vins
      </a>
      <h2 className="ddc-display mt-12 text-4xl">La relation avec Direct Du Château</h2>
      <p className="ddc-measure mt-4">
        Depuis 1992, Direct Du Château travaille avec des familles de vignerons. L’équipe suit les propriétés et prépare
        les commandes depuis l’entrepôt de Castillon-la-Bataille. Jean-Philippe Barat, Romain Elbert et Jérémy Veyssy
        sont les contacts publics cités par l’entreprise.
      </p>
    </>
  );
}

function Shipping() {
  return (
    <>
      <h2 className="ddc-display mt-12 text-4xl">D’où part votre commande</h2>
      <p className="ddc-measure mt-4">
        Les commandes sont préparées dans l’entrepôt de Castillon-la-Bataille, 141 rue Michel Montaigne. Les produits
        sont protégés par des emballages adaptés au transport de marchandises fragiles.
      </p>
      <h2 className="ddc-display mt-12 text-4xl">Livraison offerte à partir de 36&nbsp;bouteilles</h2>
      <p className="ddc-measure mt-4">
        En France métropolitaine, la livraison est annoncée comme offerte à partir de 36&nbsp;bouteilles ou équivalents.
        Un coffret correspond à une bouteille. Un carton de 50&nbsp;tubes de vin au verre correspond à six bouteilles.
      </p>
      <h2 className="ddc-display mt-12 text-4xl">Frais sous le seuil</h2>
      <p className="ddc-measure mt-4">
        Sous 36&nbsp;bouteilles, les frais dépendent du poids et sont affichés après saisie de l’adresse de livraison,
        sur la boutique. Cette page ne calcule pas un montant. L’équivalence des bières n’est pas publiée.
      </p>
      <h2 className="ddc-display mt-12 text-4xl">Besoin d’aide après la livraison</h2>
      <p className="ddc-measure mt-4">
        Pour une question sur une commande déjà passée, écrivez via la page contact. L’e-mail et les horaires ne sont
        pas affichés.
      </p>
      <div className="ddc-actions">
        <a className="ddc-button inline-flex" href={shopCollection("frontpage")}>
          Explorer les vins
        </a>
        <Link className="ddc-button-quiet inline-flex" href={`${BASE}/pages/contact`}>
          Contacter l’équipe
        </Link>
      </div>
    </>
  );
}

function Account() {
  return (
    <>
      <h2 className="ddc-display mt-12 text-4xl">À qui s’adresse le compte</h2>
      <p className="ddc-measure mt-4 text-lg">
        Vous achetez du vin pour votre activité professionnelle&nbsp;? Décrivez votre entreprise et votre besoin dans le
        formulaire. Les informations demandées servent à traiter votre accès aux conditions professionnelles
        applicables.
      </p>
      <p className="ddc-measure mt-4">
        Restaurateurs, cavistes et commerçants. Le parcours d’approbation et son délai ne sont pas décrits&nbsp;: ils
        ne sont pas validés.
      </p>
      <h2 className="ddc-display mt-12 text-4xl">Envoyer une demande</h2>
      <div className="mt-6">
        <LocalForm
          submitLabel="Envoyer ma demande"
          confirmationTitle="Demande non transmise"
          confirmationText={previewNotice}
          fields={[
            { name: "prenom", label: "Prénom", required: true },
            { name: "nom", label: "Nom", required: true },
            { name: "societe", label: "Société", required: true },
            {
              name: "activite",
              label: "Activité",
              required: true,
              options: ["Restaurateur", "Caviste", "Commerçant", "Autre professionnel"],
            },
            { name: "email", label: "E-mail", type: "email", required: true },
            { name: "telephone", label: "Téléphone", type: "tel", required: true },
            {
              name: "siret",
              label: "SIRET",
              help: "Facultatif. L’obligation du SIRET n’est pas confirmée.",
            },
            { name: "message", label: "Votre besoin", type: "textarea" },
          ]}
        />
      </div>
      <h2 className="ddc-display mt-12 text-4xl">Déjà client</h2>
      <p className="ddc-measure mt-4">
        Vous disposez déjà d’un compte approuvé&nbsp;? Utilisez la connexion de la boutique pour retrouver les
        informations liées à votre entreprise. Aucun mot de passe n’est enregistré sur cette prévisualisation.
      </p>
      <a className="ddc-button-quiet inline-flex mt-6" href={`${SHOP}/account/login`}>
        Déjà client&nbsp;? Se connecter
      </a>
      <h2 className="ddc-display mt-12 text-4xl">Questions fréquentes</h2>
      <div className="mt-6 grid max-w-3xl gap-6">
        <div>
          <h3 className="text-lg font-medium">Faut-il créer un mot de passe ici&nbsp;?</h3>
          <p className="mt-2 text-[var(--ddc-muted)]">Non. La connexion se fait sur la boutique existante.</p>
        </div>
        <div>
          <h3 className="text-lg font-medium">Le SIRET est-il obligatoire&nbsp;?</h3>
          <p className="mt-2 text-[var(--ddc-muted)]">Pas dans ce formulaire. La règle n’est pas confirmée.</p>
        </div>
        <div>
          <h3 className="text-lg font-medium">Quel est le délai de réponse&nbsp;?</h3>
          <p className="mt-2 text-[var(--ddc-muted)]">Il n’est pas affiché. Aucun délai n’a été validé.</p>
        </div>
      </div>
    </>
  );
}

function Contact() {
  return (
    <>
      <p className="ddc-measure mt-6 text-lg">
        Une question sur un vin, la commande, le compte professionnel ou la livraison&nbsp;? Indiquez le sujet de votre
        demande et les informations utiles pour que l’équipe puisse vous répondre.
      </p>
      <h2 className="ddc-display mt-12 text-4xl">Choisir le sujet de votre demande</h2>
      <div className="mt-6">
        <LocalForm
          submitLabel="Envoyer ma question"
          confirmationTitle="Question non transmise"
          confirmationText="Cette prévisualisation n’envoie rien. Lorsque l’envoi sera branché, l’équipe reçoit le sujet et les coordonnées indiquées. Aucun délai de réponse n’est annoncé."
          fields={[
            { name: "nom", label: "Nom", required: true },
            { name: "societe", label: "Société" },
            { name: "email", label: "E-mail", type: "email", required: true },
            { name: "telephone", label: "Téléphone", type: "tel" },
            {
              name: "sujet",
              label: "Sujet",
              required: true,
              options: ["Une cuvée", "Le compte professionnel", "La livraison", "Une commande", "Autre"],
            },
            { name: "message", label: "Message", type: "textarea", required: true },
          ]}
        />
      </div>
      <h2 className="ddc-display mt-12 text-4xl">Nos coordonnées</h2>
      <p className="ddc-measure mt-4">141 rue Michel Montaigne, 33350 Castillon-la-Bataille.</p>
      <p className="mt-2">
        <a href="tel:+33666846000">06&nbsp;66&nbsp;84&nbsp;60&nbsp;00</a>
      </p>
      <p className="ddc-measure mt-4 text-[var(--ddc-muted)]">
        Jean-Philippe Barat, Romain Elbert et Jérémy Veyssy sont les contacts publics. E-mail et horaires non affichés.
      </p>
      <h2 className="ddc-display mt-12 text-4xl">Questions de livraison</h2>
      <p className="ddc-measure mt-4">
        Le seuil public, les équivalences coffret et tubes, et ce qui reste à confirmer sont sur la page livraison.
      </p>
      <Link className="ddc-button-quiet inline-flex mt-6" href={`${BASE}/pages/frais-de-port`}>
        Consulter la livraison
      </Link>
    </>
  );
}

function Restaurants() {
  return (
    <>
      <p className="ddc-measure mt-6 text-lg">
        Votre carte des vins reflète les choix de votre établissement. Découvrez les cuvées des propriétés partenaires,
        comparez appellations et millésimes disponibles, puis ouvrez les fiches de la boutique avant de composer votre
        sélection.
      </p>
      <h2 className="ddc-display mt-12 text-4xl">Composer votre sélection de vins</h2>
      <p className="ddc-measure mt-4">
        Une shortlist de 6 à 12 cuvées devait être choisie avec le responsable commercial. Elle ne l’a pas été. Cette
        page ne présente donc pas une sélection inventée. Le catalogue public est le point d’accès.
      </p>
      <a className="ddc-button inline-flex mt-6" href={shopCollection("frontpage")}>
        Voir les vins
      </a>
      <h2 className="ddc-display mt-12 text-4xl">Découvrir les domaines</h2>
      <p className="ddc-measure mt-4">
        Les noms des propriétés sont listés sans biographie. Les portraits restent à valider.
      </p>
      <Link className="ddc-button-quiet inline-flex mt-6" href={`${BASE}/pages/nos-partenaires`}>
        Voir les domaines
      </Link>
      <h2 className="ddc-display mt-12 text-4xl">Conditions de commande</h2>
      <p className="ddc-measure mt-4">
        Les conditions professionnelles passent par un compte. Cette page ne promet ni création de carte, ni échantillons,
        ni délai.
      </p>
      <Link className="ddc-button inline-flex mt-6" href={`${BASE}/pages/compte-professionnel`}>
        Demander un compte professionnel
      </Link>
      <h2 className="ddc-display mt-12 text-4xl">Questions de restaurateurs</h2>
      <p className="ddc-measure mt-4">
        La livraison part de Castillon-la-Bataille et est offerte en France métropolitaine à partir de
        36&nbsp;bouteilles. Le détail est sur la page livraison. Les prix ne sont pas repris ici.
      </p>
      <Link className="underline underline-offset-4" href={`${BASE}/pages/frais-de-port`}>
        Voir la livraison
      </Link>
    </>
  );
}

function Cavistes() {
  return (
    <>
      <p className="ddc-measure mt-6 text-lg">
        Pour choisir les vins que vous présenterez en boutique, partez des domaines réellement présents au catalogue,
        puis ouvrez leurs fiches. Les histoires de familles ne sont pas publiées tant qu’elles ne sont pas vérifiées.
      </p>
      <h2 className="ddc-display mt-12 text-4xl">Découvrir les familles de vignerons</h2>
      <p className="ddc-measure mt-4">
        La liste donne le nom de chaque domaine et le nombre de références observées le 7&nbsp;octobre 2026. Pas de
        portrait, pas de lieu inventé.
      </p>
      <Link className="ddc-button inline-flex mt-6" href={`${BASE}/pages/nos-partenaires`}>
        Explorer les domaines
      </Link>
      <h2 className="ddc-display mt-12 text-4xl">Les cuvées disponibles</h2>
      <p className="ddc-measure mt-4">
        Seules les références actives de la boutique sont à retenir. Aucune fiche téléchargeable n’est proposée&nbsp;:
        l’entreprise n’en a pas fourni.
      </p>
      <a className="ddc-button-quiet inline-flex mt-6" href={shopCollection("frontpage")}>
        Voir les vins
      </a>
      <h2 className="ddc-display mt-12 text-4xl">Informations utiles pour commander</h2>
      <p className="ddc-measure mt-4">
        Compte professionnel pour les conditions réservées. Livraison depuis Castillon-la-Bataille, franco à partir de
        36&nbsp;bouteilles en France métropolitaine. Aucune marge ni exclusivité n’est annoncée.
      </p>
      <div className="ddc-actions">
        <Link className="ddc-button inline-flex" href={`${BASE}/pages/compte-professionnel`}>
          Demander un compte professionnel
        </Link>
        <Link className="ddc-button-quiet inline-flex" href={`${BASE}/pages/frais-de-port`}>
          Voir la livraison
        </Link>
      </div>
      <h2 className="ddc-display mt-12 text-4xl">Échanger avec l’équipe</h2>
      <p className="ddc-measure mt-4">
        Une question sur un domaine ou une référence&nbsp;: utilisez le formulaire. Le téléphone public est le
        06&nbsp;66&nbsp;84&nbsp;60&nbsp;00. Pas d’e-mail ni d’horaire affiché.
      </p>
      <Link className="ddc-button-quiet inline-flex mt-6" href={`${BASE}/pages/contact`}>
        Contacter l’équipe
      </Link>
    </>
  );
}
