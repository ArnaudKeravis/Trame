import raw from "./catalog.json";

export type Family = "vin" | "biere" | "coffret";
export type Mention = "rouge" | "blanc" | "rosé";

export type CatalogProduct = {
  handle: string;
  title: string;
  vendor: string;
  tags: string[];
  variantTitle: string;
  available: boolean;
  publicPrice: string;
  image: string | null;
  body: string;
  family: Family;
};

type RawProduct = Omit<CatalogProduct, "family">;

const source = raw as {
  observedAt: string;
  source: string;
  collections: Record<string, string[]>;
  products: RawProduct[];
};

export const catalogObservedAt = source.observedAt;
export const catalogSource = source.source;
export const collectionOrder = source.collections;

const byHandleMap = new Map(source.products.map((product) => [product.handle, product]));

function familyOf(handle: string): Family {
  if (source.collections.bieres?.includes(handle)) return "biere";
  if (source.collections["coffrets-cadeaux"]?.includes(handle)) return "coffret";
  return "vin";
}

export const products: CatalogProduct[] = source.products.map((product) => ({
  ...product,
  family: familyOf(product.handle),
}));

export const BASE = "/direct-du-chateau";
export const SHOP = "https://directduchateau.com";

export function shopProduct(handle: string) {
  return `${SHOP}/products/${handle}`;
}

export function shopCollection(handle: string) {
  return `${SHOP}/collections/${handle}`;
}

export function shopSearch(query: string) {
  return `${SHOP}/search?q=${encodeURIComponent(query)}`;
}

export const collections = {
  frontpage: {
    handle: "frontpage",
    family: "vin" as const,
    nav: "Vins",
    h1: "Nos vins de propriétés",
    title: "Vins de propriétés pour professionnels | Direct Du Château",
    description:
      "Parcourez les vins de propriétés proposés par Direct Du Château. Explorez les domaines, appellations et millésimes pour composer votre sélection professionnelle.",
    intro:
      "Parcourez les cuvées de nos propriétés partenaires. Affinez la sélection avec les critères réellement disponibles dans le catalogue, puis ouvrez chaque fiche pour connaître le domaine, le millésime et le conditionnement.",
    help: "Vous cherchez un domaine ou une appellation ? Utilisez la recherche ou contactez l’équipe pour obtenir les informations dont vous avez besoin.",
  },
  bieres: {
    handle: "bieres",
    family: "biere" as const,
    nav: "Bières",
    h1: "Nos bières",
    title: "Bières Brique House pour professionnels | Direct Du Château",
    description:
      "Découvrez les bières Brique House proposées par Direct Du Château : blanche, IPA et pils. Consultez chaque référence et ses conditions de commande.",
    intro:
      "Retrouvez les bières Brique House de la sélection Direct Du Château. Consultez les fiches pour vérifier la variété, le format, le conditionnement et la disponibilité de chaque référence.",
    help: "Les règles de livraison applicables aux bières doivent être confirmées avant de calculer leur équivalent en bouteilles ou d’annoncer un seuil dans le panier.",
  },
  "coffrets-cadeaux": {
    handle: "coffrets-cadeaux",
    family: "coffret" as const,
    nav: "Coffrets",
    h1: "Coffrets de dégustation",
    title: "Coffrets de dégustation Flakon | Direct Du Château",
    description:
      "Découvrez les coffrets Flakon Vignobles de France et Tour du Monde avec dégustation digitale guidée, proposés dans la sélection Direct Du Château.",
    intro:
      "Deux coffrets Flakon sont proposés dans la sélection : Vignobles de France et Tour du Monde. Chaque fiche détaille son contenu et la dégustation digitale guidée annoncée pour ce produit.",
    help: "Pour une commande professionnelle, vérifiez le conditionnement et les conditions applicables à votre compte avant de présenter ces coffrets à vos clients ou équipes.",
  },
} as const;

export type CollectionHandle = keyof typeof collections;

export function isCollectionHandle(value: string): value is CollectionHandle {
  return value in collections;
}

export function productByHandle(handle: string) {
  const product = byHandleMap.get(handle);
  return product ? { ...product, family: familyOf(handle) } : undefined;
}

export function productsInCollection(handle: CollectionHandle) {
  return (source.collections[handle] ?? [])
    .map((item) => productByHandle(item))
    .filter((item): item is CatalogProduct => Boolean(item));
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function vendorBySlug(slug: string) {
  return vendors().find((vendor) => slugify(vendor) === slug);
}

export function vendors() {
  return [...new Set(products.map((product) => product.vendor))].sort((a, b) =>
    a.localeCompare(b, "fr"),
  );
}

export function wineVendors() {
  return [
    ...new Set(products.filter((product) => product.family === "vin").map((product) => product.vendor)),
  ].sort((a, b) => a.localeCompare(b, "fr"));
}

export function isCutout(product: CatalogProduct) {
  return Boolean(product.image && product.image.split("?")[0].toLowerCase().endsWith(".png"));
}

export function cutoutWines() {
  const order: Record<string, number> = { rouge: 0, "rosé": 1, blanc: 2 };
  return productsInCollection("frontpage")
    .filter(isCutout)
    .sort((a, b) => (order[mentionFromTitle(a) ?? "blanc"] ?? 3) - (order[mentionFromTitle(b) ?? "blanc"] ?? 3));
}

export function productsByVendor(vendor: string) {
  return products.filter((product) => product.vendor === vendor);
}

export function mentionFromTitle(product: CatalogProduct): Mention | null {
  if (product.family !== "vin") return null;
  const title = product.title.toLowerCase();
  if (/(^|[^a-zà-ÿ])rosé([^a-zà-ÿ]|$)/.test(title)) return "rosé";
  if (/(^|[^a-zà-ÿ])blanc([^a-zà-ÿ]|$)/.test(title)) return "blanc";
  if (/(^|[^a-zà-ÿ])moelleux([^a-zà-ÿ]|$)/.test(title)) return "blanc";
  if (/(^|[^a-zà-ÿ])rouge([^a-zà-ÿ]|$)/.test(title)) return "rouge";
  return null;
}

export function vintageFromTitle(product: CatalogProduct) {
  return product.title.match(/\b(?:19|20)\d{2}\b/)?.[0] ?? null;
}

export function bioMentionInTitle(product: CatalogProduct) {
  return /\bbio\b/i.test(product.title);
}

export function formatPublicPrice(value: string) {
  const [euros, cents = "00"] = value.split(".");
  return `${euros},${cents.padEnd(2, "0").slice(0, 2)} €`;
}

export function searchProducts(query: string) {
  const needle = query.trim().toLocaleLowerCase("fr");
  if (!needle) return [];
  return products.filter((product) =>
    [product.title, product.vendor, product.body, product.handle]
      .join(" ")
      .toLocaleLowerCase("fr")
      .includes(needle),
  );
}
