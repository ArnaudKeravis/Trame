import type { Metadata } from "next";
import Link from "next/link";
import { CaseThreshold } from "@/components/clients/direct-du-chateau/home/CaseThreshold";
import { DomainIndex, type Domain } from "@/components/clients/direct-du-chateau/home/DomainIndex";
import { HeroVault } from "@/components/clients/direct-du-chateau/home/HeroVault";
import { RackScroll } from "@/components/clients/direct-du-chateau/home/RackScroll";
import type { Bottle } from "@/components/clients/direct-du-chateau/home/types";
import {
  BASE,
  catalogObservedAt,
  cutoutWines,
  isCutout,
  productsByVendor,
  productsInCollection,
  wineVendors,
  type CatalogProduct,
} from "@/components/clients/direct-du-chateau/catalog";

export const metadata: Metadata = {
  alternates: { canonical: BASE },
  openGraph: {
    title: "Vins et vignerons pour professionnels | Direct Du Château",
    description:
      "Découvrez les vins de propriétés et les familles de vignerons suivies par Direct Du Château depuis 1992. Une sélection pensée pour les professionnels.",
    locale: "fr_FR",
    type: "website",
  },
};

function toBottle(product: CatalogProduct): Bottle {
  return {
    handle: product.handle,
    title: product.title,
    vendor: product.vendor,
    image: product.image ?? "",
  };
}

const heroHandles = [
  "reflets-de-soleil-igp-atlantique-2023-rouge-copie",
  "b-de-bonhoste-cremant-de-bordeaux-2022-rose",
  "chateau-plantey-de-lieujean-haut-medoc-2020-rouge-copie",
  "b-de-bonhoste-cremant-de-bordeaux-2022-blanc",
  "sante-fe-igp-atlantique-bio",
  "florius-igp-pays-doc-2022-blanc",
  "les-frangins-igp-perigord-2023-rouge-copie",
];

const observedDate = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(
  new Date(catalogObservedAt),
);

export default function HomePage() {
  const cutouts = cutoutWines();
  const byHandle = new Map(cutouts.map((product) => [product.handle, product]));
  const hero = heroHandles
    .map((handle) => byHandle.get(handle))
    .filter((product): product is CatalogProduct => Boolean(product))
    .map(toBottle);
  const rack = cutouts.map(toBottle);
  const wineCount = productsInCollection("frontpage").length;
  const domains: Domain[] = wineVendors().map((name) => {
    const wines = productsByVendor(name).filter((product) => product.family === "vin");
    const cutout = wines.find(isCutout);
    return { name, count: wines.length, image: cutout?.image ?? null };
  });

  return (
    <main id="contenu">
      <section className="ddc-hero-x">
        <div className="ddc-wrap ddc-hero-grid">
          <div className="ddc-hero-copy">
            <h1 className="ddc-hero-title ddc-rise">Vins de propriétés pour les professionnels</h1>
            <p className="ddc-hero-lede ddc-rise" style={{ animationDelay: "120ms" }}>
              Depuis 1992, Direct Du Château travaille avec des familles de vignerons. Restaurateurs, cavistes et
              commerçants&nbsp;: explorez les cuvées, découvrez leurs domaines et trouvez les informations utiles pour
              composer votre sélection.
            </p>
            <div className="ddc-actions ddc-rise" style={{ animationDelay: "220ms" }}>
              <Link className="ddc-button inline-flex" href={`${BASE}/pages/compte-professionnel`}>
                Demander un compte professionnel
              </Link>
            </div>
          </div>
          <HeroVault bottles={hero} />
        </div>
        <dl className="ddc-wrap ddc-facts">
          <div>
            <dt>Depuis</dt>
            <dd>1992</dd>
          </div>
          <div>
            <dt>Vins au catalogue public</dt>
            <dd>{wineCount}</dd>
          </div>
          <div>
            <dt>Domaines</dt>
            <dd>{domains.length}</dd>
          </div>
          <div>
            <dt>Entrepôt</dt>
            <dd className="ddc-facts-place">Castillon-la-Bataille</dd>
          </div>
        </dl>
      </section>

      <RackScroll bottles={rack}>
        <h2 id="selection" className="ddc-section-title">
          Découvrez la sélection
        </h2>
        <p className="ddc-rack-text">
          Notre équipe suit les propriétés partenaires et prépare les commandes depuis Castillon-la-Bataille. Retrouvez
          sur chaque fiche les informations disponibles sur le vin et ses conditions de commande.
        </p>
        <p className="ddc-rack-note">
          {rack.length} bouteilles photographiées sur {wineCount} vins, catalogue observé le {observedDate}. Les fiches,
          les prix et la commande ne sont pas ouverts depuis ce site.
        </p>
      </RackScroll>

      <section className="ddc-wrap ddc-section-x" aria-labelledby="familles">
        <div className="ddc-split">
          <div>
            <h2 id="familles" className="ddc-section-title">
              Rencontrez les familles de vignerons
            </h2>
            <p className="ddc-measure mt-6">
              Derrière chaque cuvée, un domaine de la sélection. Survolez un nom pour voir l’une de ses bouteilles. Les
              portraits et biographies restent à valider.
            </p>
            <Link className="ddc-button-quiet mt-8 inline-flex" href={`${BASE}/pages/nos-partenaires`}>
              Voir les domaines
            </Link>
          </div>
          <DomainIndex domains={domains} />
        </div>
      </section>

      <section className="ddc-steps-x" aria-labelledby="commander">
        <div className="ddc-wrap ddc-split">
          <div className="ddc-steps-head">
            <h2 id="commander" className="ddc-section-title">
              Comment commander
            </h2>
            <p className="ddc-measure mt-6">
              Vous découvrez l’offre&nbsp;? Parcourez les vins et les domaines. Vous représentez une entreprise&nbsp;?
              Consultez les étapes de demande d’un compte professionnel.
            </p>
          </div>
          <ol className="ddc-steps-list">
            <li>
              <span className="ddc-step-number" aria-hidden="true">
                1
              </span>
              <h3>Parcourir</h3>
              <p>Les vins et leurs fiches ne sont pas ouverts depuis ce site. Les domaines sont présentés ici.</p>
            </li>
            <li>
              <span className="ddc-step-number" aria-hidden="true">
                2
              </span>
              <h3>Demander un compte</h3>
              <p>Décrivez votre entreprise et votre besoin. Aucun mot de passe n’est créé sur ce site.</p>
              <Link className="ddc-inline-link" href={`${BASE}/pages/compte-professionnel`}>
                Demander un compte professionnel
              </Link>
            </li>
            <li>
              <span className="ddc-step-number" aria-hidden="true">
                3
              </span>
              <h3>Commander</h3>
              <p>La connexion et les conditions professionnelles restent celles de la boutique. Aucun délai n’est annoncé.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="ddc-wrap ddc-section-x" aria-labelledby="livraison">
        <div className="ddc-split">
          <div>
            <h2 id="livraison" className="ddc-section-title">
              Livraison et contact
            </h2>
            <p className="ddc-measure mt-6">
              Les commandes partent de l’entrepôt de Castillon-la-Bataille. Un coffret compte pour une bouteille, un
              carton de 50&nbsp;tubes de vin au verre pour six. Sous le seuil, les frais dépendent du poids et de
              l’adresse. L’équivalence des bières n’est pas publiée.
            </p>
            <div className="ddc-actions">
              <Link className="ddc-button inline-flex" href={`${BASE}/pages/frais-de-port`}>
                Voir la livraison
              </Link>
              <Link className="ddc-button-quiet inline-flex" href={`${BASE}/pages/contact`}>
                Contacter l’équipe
              </Link>
            </div>
          </div>
          <CaseThreshold />
        </div>
        <a className="ddc-phone" href="tel:+33666846000">
          06&nbsp;66&nbsp;84&nbsp;60&nbsp;00
        </a>
        <p className="ddc-phone-caption">141 rue Michel Montaigne, 33350 Castillon-la-Bataille</p>
      </section>
    </main>
  );
}
