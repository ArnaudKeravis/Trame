import Image from "next/image";
import type { CatalogProduct } from "./catalog";

export function BottleLink({ product }: { product: CatalogProduct }) {
  if (!product.image) return null;

  return (
    <div className="ddc-bottle">
      <Image
        src={product.image}
        alt={`Photo du catalogue public : ${product.title}.`}
        width={800}
        height={800}
        sizes="(min-width: 1024px) 240px, (min-width: 640px) 45vw, 100vw"
      />
      <span className="font-medium">{product.title}</span>
      <span className="text-sm text-[var(--ddc-muted)]">{product.vendor}</span>
    </div>
  );
}
