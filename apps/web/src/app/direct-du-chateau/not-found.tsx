import Link from "next/link";
import { BASE, shopCollection } from "@/components/clients/direct-du-chateau/catalog";

export default function NotFound() {
  return (
    <main id="contenu" className="ddc-wrap ddc-section">
      <h1 className="ddc-display text-5xl">Page introuvable</h1>
      <p className="ddc-measure mt-4">
        Cette adresse n’existe pas dans la prévisualisation. Les vins sont sur la boutique actuelle.
      </p>
      <div className="ddc-actions">
        <a className="ddc-button inline-flex" href={shopCollection("frontpage")}>
          Découvrir les vins
        </a>
        <Link href={BASE} className="ddc-button-quiet inline-flex">
          Retour à l’accueil
        </Link>
      </div>
    </main>
  );
}
