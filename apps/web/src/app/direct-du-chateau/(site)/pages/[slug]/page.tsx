import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BottleStrip } from "@/components/clients/direct-du-chateau/home/BottleStrip";
import { featuredBottles } from "@/components/clients/direct-du-chateau/home/bottles";
import { CaseThreshold } from "@/components/clients/direct-du-chateau/home/CaseThreshold";
import { DomainIndex, type Domain } from "@/components/clients/direct-du-chateau/home/DomainIndex";
import { PageHero } from "@/components/clients/direct-du-chateau/home/PageHero";
import { LocalForm } from "@/components/clients/direct-du-chateau/LocalForm";
import {
  BASE,
  isCutout,
  productsByVendor,
  shopCollection,
  SHOP,
  shopSearch,
  wineVendors,
} from "@/components/clients/direct-du-chateau/catalog";

const pages = {
  "nos-partenaires": {
    title: "Familles de vignerons et domaines | Direct Du Château",
    description:
      "Rencontrez les familles de vignerons et les domaines présentés par Direct Du Château. Découvrez leurs histoires et les cuvées associées à chaque producteur.",
    h1: "Nos familles de vignerons",
    bottles: 0,
  },
  "frais-de-port": {
    title: "Livraison et frais de port | Direct Du Château",
    description:
      "Consultez les modalités de livraison Direct Du Château : expédition depuis Castillon-la-Bataille, seuil de 36 bouteilles et calcul des frais sous ce seuil.",
    h1: "Livraison et frais de port",
    bottles: 3,
  },
  "compte-professionnel": {
    title: "Demander un compte professionnel | Direct Du Château",
    description:
      "Restaurateur, caviste ou commerçant ? Découvrez comment demander un accès professionnel à Direct Du Château et retrouver les informations pour votre activité.",
    h1: "Demander un compte professionnel",
    bottles: 6,
  },
  contact: {
    title: "Contacter l’équipe Direct Du Château | Vins professionnels",
    description:
      "Une question sur une cuvée, votre compte professionnel ou une commande ? Retrouvez les coordonnées de Direct Du Château et envoyez votre demande à l’équipe.",
    h1: "Contacter Direct Du Château",
    bottles: 9,
  },
  "vins-pour-restaurateurs": {
    title: "Vins de propriétés pour restaurateurs | Direct Du Château",
    description:
      "Explorez des vins de propriétés pour votre restaurant : cuvées, domaines et informations de commande chez Direct Du Château. Découvrez la sélection disponible.",
    h1: "Des vins de propriétés pour votre restaurant",
    bottles: 12,
  },
  "vins-pour-cavistes": {
    title: "Vins de vignerons pour cavistes | Direct Du Château",
    description:
      "Découvrez les vins et les familles de vignerons présentés par Direct Du Château pour les cavistes. Explorez les cuvées et leurs domaines.",
    h1: "Des vins et des histoires de vignerons pour cavistes",
    bottles: 15,
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

const domains: Domain[] = wineVendors().map((name) => {
  const wines = productsByVendor(name).filter((product) => product.family === "vin");
  const cutout = wines.find(isCutout);
  return { name, count: wines.length, href: shopSearch(name), image: cutout?.image ?? null };
});

export default async function EditorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isPageSlug(slug)) notFound();

  return (
    <main id="contenu">
      <PageBody slug={slug} title={pages[slug].h1} />
    </main>
  );
}

function PageBody({ slug, title }: { slug: PageSlug; title: string }) {
  const bottles = featuredBottles(pages[slug].bottles);
  if (slug === "nos-partenaires") return <Partners title={title} bottles={bottles} />;
  if (slug === "frais-de-port") return <Shipping title={title} bottles={bottles} />;
  if (slug === "compte-professionnel") return <Account title={title} bottles={bottles} />;
  if (slug === "contact") return <Contact title={title} bottles={bottles} />;
  if (slug === "vins-pour-restaurateurs") return <Restaurants title={title} bottles={bottles} />;
  return <Cavistes title={title} bottles={bottles} />;
}

function Partners({ title, bottles }: { title: string; bottles: ReturnType<typeof featuredBottles> }) {
  return (
    <>
      <PageHero
        title={title}
        bottles={bottles}
        lede={
          <p>
            Derrière chaque cuvée, il y a un domaine de la sélection. Les histoires, les lieux et les photos de familles ne
            sont pas affichés&nbsp;: ils ne sont pas vérifiés. Les noms ci-dessous viennent du catalogue public observé le
            7&nbsp;octobre 2026.
          </p>
        }
      />
      <section className="ddc-wrap ddc-section-x" aria-labelledby="domaines">
        <div className="ddc-split">
          <div>
            <h2 id="domaines" className="ddc-section-title">
              Les domaines de la sélection
            </h2>
            <p className="ddc-measure mt-6">
              Le chiffre est le nombre de vins du domaine dans ce catalogue. Survolez un nom pour voir une bouteille
              photographiée, ouvrez-le pour ses vins sur la boutique.
            </p>
          </div>
          <DomainIndex domains={domains} />
        </div>
      </section>
      <section className="ddc-band" aria-labelledby="leurs-vins">
        <div className="ddc-wrap ddc-section-x">
          <h2 id="leurs-vins" className="ddc-section-title">
            Leurs vins
          </h2>
          <p className="ddc-measure mt-6">
            Les fiches, les millésimes et les conditions de commande sont sur la boutique. Cette page ne recopie ni les prix
            ni les stocks.
          </p>
          <a className="ddc-button ddc-button-on-dark mt-8 inline-flex" href={shopCollection("frontpage")}>
            Explorer tous les vins
          </a>
          <BottleStrip bottles={featuredBottles(7, 8)} label="Bouteilles photographiées du catalogue" />
          <p className="ddc-band-note">Bouteilles photographiées du catalogue public. Prix et commande sur la boutique.</p>
        </div>
      </section>
      <section className="ddc-wrap ddc-section-x" aria-labelledby="relation">
        <h2 id="relation" className="ddc-section-title">
          La relation avec Direct Du Château
        </h2>
        <p className="ddc-measure mt-6">
          Depuis 1992, Direct Du Château travaille avec des familles de vignerons. L’équipe suit les propriétés et prépare
          les commandes depuis l’entrepôt de Castillon-la-Bataille. Jean-Philippe Barat, Romain Elbert et Jérémy Veyssy
          sont les contacts publics cités par l’entreprise.
        </p>
        <ul className="ddc-names">
          <li>Jean-Philippe Barat</li>
          <li>Romain Elbert</li>
          <li>Jérémy Veyssy</li>
        </ul>
      </section>
    </>
  );
}

function Shipping({ title, bottles }: { title: string; bottles: ReturnType<typeof featuredBottles> }) {
  return (
    <>
      <PageHero title={title} bottles={bottles} />
      <section className="ddc-wrap ddc-section-x" aria-labelledby="depart">
        <div className="ddc-split">
          <div>
            <h2 id="depart" className="ddc-section-title">
              D’où part votre commande
            </h2>
            <p className="ddc-measure mt-6">
              Les commandes sont préparées dans l’entrepôt de Castillon-la-Bataille, 141 rue Michel Montaigne. Les produits
              sont protégés par des emballages adaptés au transport de marchandises fragiles.
            </p>
          </div>
          <p className="ddc-place">
            141 rue Michel Montaigne
            <br />
            33350 Castillon-la-Bataille
          </p>
        </div>
      </section>
      <section className="ddc-steps-x" aria-labelledby="seuil">
        <div className="ddc-wrap ddc-split">
          <div>
            <h2 id="seuil" className="ddc-section-title">
              Livraison offerte à partir de 36&nbsp;bouteilles
            </h2>
            <p className="ddc-measure mt-6">
              En France métropolitaine, la livraison est annoncée comme offerte à partir de 36&nbsp;bouteilles ou
              équivalents. Un coffret correspond à une bouteille. Un carton de 50&nbsp;tubes de vin au verre correspond à
              six bouteilles.
            </p>
          </div>
          <CaseThreshold />
        </div>
      </section>
      <section className="ddc-wrap ddc-section-x" aria-labelledby="frais">
        <h2 id="frais" className="ddc-section-title">
          Frais sous le seuil
        </h2>
        <p className="ddc-measure mt-6">
          Sous 36&nbsp;bouteilles, les frais dépendent du poids et sont affichés après saisie de l’adresse de livraison,
          sur la boutique. Cette page ne calcule pas un montant. L’équivalence des bières n’est pas publiée.
        </p>
      </section>
      <section className="ddc-band" aria-labelledby="aide">
        <div className="ddc-wrap ddc-section-x">
          <h2 id="aide" className="ddc-section-title">
            Besoin d’aide après la livraison
          </h2>
          <p className="ddc-measure mt-6">
            Pour une question sur une commande déjà passée, écrivez via la page contact. L’e-mail et les horaires ne sont
            pas affichés.
          </p>
          <div className="ddc-actions">
            <a className="ddc-button ddc-button-on-dark inline-flex" href={shopCollection("frontpage")}>
              Explorer les vins
            </a>
            <Link className="ddc-button-quiet-on-dark inline-flex" href={`${BASE}/pages/contact`}>
              Contacter l’équipe
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Account({ title, bottles }: { title: string; bottles: ReturnType<typeof featuredBottles> }) {
  return (
    <>
      <PageHero title={title} bottles={bottles} />
      <section className="ddc-steps-x" aria-labelledby="pour-qui">
        <div className="ddc-wrap ddc-split">
          <div className="ddc-steps-head">
            <h2 id="pour-qui" className="ddc-section-title">
              À qui s’adresse le compte
            </h2>
            <p className="ddc-measure mt-6 text-lg">
              Vous achetez du vin pour votre activité professionnelle&nbsp;? Décrivez votre entreprise et votre besoin dans
              le formulaire. Les informations demandées servent à traiter votre accès aux conditions professionnelles
              applicables.
            </p>
            <p className="ddc-measure mt-4">
              Restaurateurs, cavistes et commerçants. Le parcours d’approbation et son délai ne sont pas décrits&nbsp;:
              ils ne sont pas validés.
            </p>
          </div>
          <div>
            <h2 className="ddc-section-title">Envoyer une demande</h2>
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
          </div>
        </div>
      </section>
      <section className="ddc-wrap ddc-section-x" aria-labelledby="deja-client">
        <h2 id="deja-client" className="ddc-section-title">
          Déjà client
        </h2>
        <p className="ddc-measure mt-6">
          Vous disposez déjà d’un compte approuvé&nbsp;? Utilisez la connexion de la boutique pour retrouver les
          informations liées à votre entreprise. Aucun mot de passe n’est enregistré sur cette prévisualisation.
        </p>
        <a className="ddc-button-quiet mt-8 inline-flex" href={`${SHOP}/account/login`}>
          Déjà client&nbsp;? Se connecter
        </a>
      </section>
      <section className="ddc-wrap ddc-section-x" aria-labelledby="faq">
        <h2 id="faq" className="ddc-section-title">
          Questions fréquentes
        </h2>
        <ol className="ddc-steps-list mt-10">
          <li>
            <span className="ddc-step-number" aria-hidden="true">
              1
            </span>
            <h3>Faut-il créer un mot de passe ici&nbsp;?</h3>
            <p>Non. La connexion se fait sur la boutique existante.</p>
          </li>
          <li>
            <span className="ddc-step-number" aria-hidden="true">
              2
            </span>
            <h3>Le SIRET est-il obligatoire&nbsp;?</h3>
            <p>Pas dans ce formulaire. La règle n’est pas confirmée.</p>
          </li>
          <li>
            <span className="ddc-step-number" aria-hidden="true">
              3
            </span>
            <h3>Quel est le délai de réponse&nbsp;?</h3>
            <p>Il n’est pas affiché. Aucun délai n’a été validé.</p>
          </li>
        </ol>
      </section>
    </>
  );
}

function Contact({ title, bottles }: { title: string; bottles: ReturnType<typeof featuredBottles> }) {
  return (
    <>
      <PageHero
        title={title}
        bottles={bottles}
        lede={
          <p>
            Une question sur un vin, la commande, le compte professionnel ou la livraison&nbsp;? Indiquez le sujet de votre
            demande et les informations utiles pour que l’équipe puisse vous répondre.
          </p>
        }
      />
      <section className="ddc-steps-x" aria-labelledby="sujet">
        <div className="ddc-wrap">
          <h2 id="sujet" className="ddc-section-title">
            Choisir le sujet de votre demande
          </h2>
          <div className="mt-8">
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
        </div>
      </section>
      <section className="ddc-wrap ddc-section-x" aria-labelledby="coordonnees">
        <h2 id="coordonnees" className="ddc-section-title">
          Nos coordonnées
        </h2>
        <a className="ddc-phone" href="tel:+33666846000">
          06&nbsp;66&nbsp;84&nbsp;60&nbsp;00
        </a>
        <p className="ddc-phone-caption">141 rue Michel Montaigne, 33350 Castillon-la-Bataille</p>
        <p className="ddc-measure mt-6 text-[var(--ddc-muted)]">
          Jean-Philippe Barat, Romain Elbert et Jérémy Veyssy sont les contacts publics. E-mail et horaires non affichés.
        </p>
      </section>
      <section className="ddc-band" aria-labelledby="livraison-contact">
        <div className="ddc-wrap ddc-section-x">
          <h2 id="livraison-contact" className="ddc-section-title">
            Questions de livraison
          </h2>
          <p className="ddc-measure mt-6">
            Le seuil public, les équivalences coffret et tubes, et ce qui reste à confirmer sont sur la page livraison.
          </p>
          <Link className="ddc-button ddc-button-on-dark mt-8 inline-flex" href={`${BASE}/pages/frais-de-port`}>
            Consulter la livraison
          </Link>
        </div>
      </section>
    </>
  );
}

function Restaurants({ title, bottles }: { title: string; bottles: ReturnType<typeof featuredBottles> }) {
  return (
    <>
      <PageHero
        title={title}
        bottles={bottles}
        lede={
          <p>
            Votre carte des vins reflète les choix de votre établissement. Découvrez les cuvées des propriétés partenaires,
            comparez appellations et millésimes disponibles, puis ouvrez les fiches de la boutique avant de composer votre
            sélection.
          </p>
        }
      />
      <section className="ddc-band" aria-labelledby="composer">
        <div className="ddc-wrap ddc-section-x">
          <h2 id="composer" className="ddc-section-title">
            Composer votre sélection de vins
          </h2>
          <p className="ddc-measure mt-6">
            Une shortlist de 6 à 12 cuvées devait être choisie avec le responsable commercial. Elle ne l’a pas été. Cette
            page ne présente donc pas une sélection inventée. Le catalogue public est le point d’accès.
          </p>
          <a className="ddc-button ddc-button-on-dark mt-8 inline-flex" href={shopCollection("frontpage")}>
            Voir les vins
          </a>
          <BottleStrip bottles={featuredBottles(4, 8)} label="Bouteilles photographiées du catalogue" />
          <p className="ddc-band-note">Bouteilles photographiées du catalogue public. Prix et commande sur la boutique.</p>
        </div>
      </section>
      <section className="ddc-wrap ddc-section-x" aria-labelledby="domaines-resto">
        <h2 id="domaines-resto" className="ddc-section-title">
          Découvrir les domaines
        </h2>
        <p className="ddc-measure mt-6">Les noms des propriétés sont listés sans biographie. Les portraits restent à valider.</p>
        <Link className="ddc-button-quiet mt-8 inline-flex" href={`${BASE}/pages/nos-partenaires`}>
          Voir les domaines
        </Link>
      </section>
      <section className="ddc-steps-x" aria-labelledby="conditions">
        <div className="ddc-wrap">
          <h2 id="conditions" className="ddc-section-title">
            Conditions de commande
          </h2>
          <p className="ddc-measure mt-6">
            Les conditions professionnelles passent par un compte. Cette page ne promet ni création de carte, ni
            échantillons, ni délai.
          </p>
          <Link className="ddc-button mt-8 inline-flex" href={`${BASE}/pages/compte-professionnel`}>
            Demander un compte professionnel
          </Link>
        </div>
      </section>
      <section className="ddc-wrap ddc-section-x" aria-labelledby="questions-resto">
        <h2 id="questions-resto" className="ddc-section-title">
          Questions de restaurateurs
        </h2>
        <p className="ddc-measure mt-6">
          La livraison part de Castillon-la-Bataille et est offerte en France métropolitaine à partir de
          36&nbsp;bouteilles. Le détail est sur la page livraison. Les prix ne sont pas repris ici.
        </p>
        <Link className="ddc-inline-link mt-6" href={`${BASE}/pages/frais-de-port`}>
          Voir la livraison
        </Link>
      </section>
    </>
  );
}

function Cavistes({ title, bottles }: { title: string; bottles: ReturnType<typeof featuredBottles> }) {
  return (
    <>
      <PageHero
        title={title}
        bottles={bottles}
        lede={
          <p>
            Pour choisir les vins que vous présenterez en boutique, partez des domaines réellement présents au catalogue,
            puis ouvrez leurs fiches. Les histoires de familles ne sont pas publiées tant qu’elles ne sont pas vérifiées.
          </p>
        }
      />
      <section className="ddc-wrap ddc-section-x" aria-labelledby="familles-cavistes">
        <div className="ddc-split">
          <div>
            <h2 id="familles-cavistes" className="ddc-section-title">
              Découvrir les familles de vignerons
            </h2>
            <p className="ddc-measure mt-6">
              La liste donne le nom de chaque domaine et le nombre de références observées le 7&nbsp;octobre 2026. Pas de
              portrait, pas de lieu inventé.
            </p>
            <Link className="ddc-button mt-8 inline-flex" href={`${BASE}/pages/nos-partenaires`}>
              Explorer les domaines
            </Link>
          </div>
          <DomainIndex domains={domains} />
        </div>
      </section>
      <section className="ddc-band" aria-labelledby="cuvees">
        <div className="ddc-wrap ddc-section-x">
          <h2 id="cuvees" className="ddc-section-title">
            Les cuvées disponibles
          </h2>
          <p className="ddc-measure mt-6">
            Seules les références actives de la boutique sont à retenir. Aucune fiche téléchargeable n’est proposée&nbsp;:
            l’entreprise n’en a pas fourni.
          </p>
          <a className="ddc-button ddc-button-on-dark mt-8 inline-flex" href={shopCollection("frontpage")}>
            Voir les vins
          </a>
          <BottleStrip bottles={featuredBottles(11, 8)} label="Bouteilles photographiées du catalogue" />
          <p className="ddc-band-note">Bouteilles photographiées du catalogue public. Prix et commande sur la boutique.</p>
        </div>
      </section>
      <section className="ddc-steps-x" aria-labelledby="commander-cavistes">
        <div className="ddc-wrap">
          <h2 id="commander-cavistes" className="ddc-section-title">
            Informations utiles pour commander
          </h2>
          <p className="ddc-measure mt-6">
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
        </div>
      </section>
      <section className="ddc-wrap ddc-section-x" aria-labelledby="echanger">
        <h2 id="echanger" className="ddc-section-title">
          Échanger avec l’équipe
        </h2>
        <p className="ddc-measure mt-6">
          Une question sur un domaine ou une référence&nbsp;: utilisez le formulaire. Le téléphone public est le
          06&nbsp;66&nbsp;84&nbsp;60&nbsp;00. Pas d’e-mail ni d’horaire affiché.
        </p>
        <Link className="ddc-button-quiet mt-8 inline-flex" href={`${BASE}/pages/contact`}>
          Contacter l’équipe
        </Link>
      </section>
    </>
  );
}
