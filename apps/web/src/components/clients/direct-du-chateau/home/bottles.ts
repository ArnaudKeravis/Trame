import { cutoutWines, type CatalogProduct } from "../catalog";
import type { Bottle } from "./types";

export function toBottle(product: CatalogProduct): Bottle {
  return {
    handle: product.handle,
    title: product.title,
    vendor: product.vendor,
    image: product.image ?? "",
  };
}

export function featuredBottles(offset = 0, count = 7) {
  const cutouts = cutoutWines();
  const total = cutouts.length;
  if (!total) return [];
  const size = Math.min(count, total);
  return Array.from({ length: size }, (_, index) => toBottle(cutouts[(offset + index) % total]));
}
