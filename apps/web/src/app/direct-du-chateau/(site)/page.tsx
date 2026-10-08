import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BottleLink } from "@/components/clients/direct-du-chateau/BottleLink";
import {
  BASE,
  productByHandle,
  productsInCollection,
  shopCollection,
  shopProduct,
  wineVendors,
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

export default function HomePage() {
  const hero = productByHandle("chateau-thibeaud-maillet-pomerol");
  const selection = productsInCollection("frontpage")
    .filter((product) => product.image)
    .slice(0, 4);
  const families = wineVendors().slice(0, 6);

  return (
    <main id="contenu">
      <section className="ddc-wrap ddc-hero">
        <div>
          <h1 className="ddc-display text-5xl sm:text-6xl">Vins de propriétés pour les professionnels</h1>
          <p className="ddc-measure mt-6 text-lg">
            Depuis 1992, Direct Du Château travaille avec des familles de vignerons. Restaurateurs, cavistes et
            commerçants&nbsp;: explorez les cuvées, découvrez leurs domaines et trouvez les informations utiles pour
            composer votre sélection.
          </p>
          <div className="ddc-actions">
            <a className="ddc-button inline-flex" href={shopCollection("frontpage")}>
              Découvrir les vins
            </a>
            <Link className="ddc-button-quiet inline-flex" href={`${BASE}/pages/compte-professionnel`}>
              Demander un compte professionnel
            </Link>
          </div>
        </div>
        {hero?.image ? (
          <figure>
            <a
              href={shopProduct(hero.handle)}
              aria-label="Photo du catalogue : Château Thibeaud-Maillet, Pomerol. Ouvre la fiche sur la boutique."
            >
              <Image
                src={hero.image}
                alt="Bouteille sur fond gris. Étiquette lisible : Château Thibeaud-Maillet, Pomerol, millésime 2019."
                width={1181}
                height={1181}
                priority
                sizes="(min-width: 900px) 420px, 100vw"
              />
            </a>
            <figcaption className="mt-3 text-sm text-[var(--ddc-muted)]">
              Photo du catalogue public, liée à la fiche Château Thibeaud Maillet Pomerol. L’étiquette visible indique
              2019.
            </figcaption>
          </figure>
        ) : null}
      </section>

      <section className="ddc-wrap ddc-section">
        <h2 className="ddc-display text-4xl sm:text-5xl">Découvrez la sélection</h2>
        <p className="ddc-measure mt-4">
          Notre équipe suit les propriétés partenaires et prépare les commandes depuis Castillon-la-Bataille. Retrouvez
          sur chaque fiche les informations disponibles sur le vin et ses conditions de commande.
        </p>
        <ul className="ddc-cards ddc-cards-4 mt-8">
          {selection.map((product) => (
            <li key={product.handle}>
              <BottleLink product={product} />
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-[var(--ddc-muted)]">
          Quatre références du catalogue public. Les prix et le paiement restent sur la boutique.
        </p>
      </section>

      <section className="ddc-wrap ddc-section">
        <h2 className="ddc-display text-4xl sm:text-5xl">Rencontrez les familles de vignerons</h2>
        <p className="ddc-measure mt-4">
          Derrière chaque cuvée, un domaine de la sélection. Les portraits et les biographies restent à valider&nbsp;:
          cette page donne les noms présents au catalogue, pas une histoire inventée.
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {families.map((vendor) => (
            <li key={vendor}>
              <Link className="underline underline-offset-4" href={`${BASE}/pages/nos-partenaires#domaines`}>
                {vendor}
              </Link>
            </li>
          ))}
        </ul>
        <Link className="ddc-button-quiet mt-6 inline-flex" href={`${BASE}/pages/nos-partenaires`}>
          Voir les domaines
        </Link>
      </section>

      <section className="ddc-wrap ddc-section">
        <h2 className="ddc-display text-4xl sm:text-5xl">Comment commander</h2>
        <p className="ddc-measure mt-4">
          Vous découvrez l’offre&nbsp;? Parcourez les vins et les domaines. Vous représentez une entreprise&nbsp;?
          Consultez les étapes de demande d’un compte professionnel.
        </p>
        <ol className="ddc-steps ddc-measure mt-6">
          <li>
            Parcourez les vins sur la boutique et les domaines sur ce site.{" "}
            <a className="underline underline-offset-4" href={shopCollection("frontpage")}>
              Découvrir les vins
            </a>
          </li>
          <li>
            Demandez un compte professionnel. Aucun mot de passe n’est créé ici.{" "}
            <Link className="underline underline-offset-4" href={`${BASE}/pages/compte-professionnel`}>
              Demander un compte professionnel
            </Link>
          </li>
          <li>La connexion et les conditions professionnelles restent celles de la boutique. Aucun délai n’est annoncé.</li>
        </ol>
      </section>

      <section className="ddc-wrap ddc-section">
        <h2 className="ddc-display text-4xl sm:text-5xl">Livraison et contact</h2>
        <p className="ddc-measure mt-4">
          Les commandes partent de l’entrepôt de Castillon-la-Bataille. En France métropolitaine, la livraison est
          offerte à partir de 36&nbsp;bouteilles ou équivalents. Un coffret compte pour une bouteille. Sous ce seuil, les
          frais dépendent du poids et de l’adresse. L’équivalence des bières n’est pas publiée.
        </p>
        <div className="ddc-actions">
          <Link className="ddc-button inline-flex" href={`${BASE}/pages/frais-de-port`}>
            Voir la livraison
          </Link>
          <Link className="ddc-button-quiet inline-flex" href={`${BASE}/pages/contact`}>
            Contacter l’équipe
          </Link>
        </div>
      </section>
    </main>
  );
}
