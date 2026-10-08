import Link from "next/link";
import { BASE } from "@/components/clients/direct-du-chateau/catalog";
import { featuredBottles } from "@/components/clients/direct-du-chateau/home/bottles";
import { PageHero } from "@/components/clients/direct-du-chateau/home/PageHero";

export default function NotFound() {
  return (
    <main id="contenu">
      <PageHero
        kicker="Direct Du Château"
        title="Page introuvable"
        bottles={featuredBottles(5)}
        lede={<p>Cette adresse n’existe pas dans la prévisualisation.</p>}
      >
        <Link href={BASE} className="ddc-button inline-flex">
          Retour à l’accueil
        </Link>
      </PageHero>
    </main>
  );
}
