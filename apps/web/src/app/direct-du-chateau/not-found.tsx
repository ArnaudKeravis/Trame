import Link from "next/link";
import { BASE, shopCollection } from "@/components/clients/direct-du-chateau/catalog";
import { featuredBottles } from "@/components/clients/direct-du-chateau/home/bottles";
import { PageHero } from "@/components/clients/direct-du-chateau/home/PageHero";

export default function NotFound() {
  return (
    <main id="contenu">
      <PageHero
        kicker="Direct Du Château"
        title="Page introuvable"
        bottles={featuredBottles(5)}
        lede={<p>Cette adresse n’existe pas dans la prévisualisation. Les vins sont sur la boutique actuelle.</p>}
      >
        <a className="ddc-button inline-flex" href={shopCollection("frontpage")}>
          Découvrir les vins
        </a>
        <Link href={BASE} className="ddc-button-quiet inline-flex">
          Retour à l’accueil
        </Link>
      </PageHero>
    </main>
  );
}
