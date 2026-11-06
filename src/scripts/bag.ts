import { getCart, type CartLine } from './cart';
import { getProduct, type Product } from '../data/products';
import { absoluteUrl, colorLabel, productUrl } from '../lib/catalog';
import type { OrderLine } from './order';

export interface ResolvedLine {
  index: number;
  line: CartLine;
  product: Product;
  label: string;
  image: string;
  url: string;
}

/** Cart lines joined with the current catalogue. Drops anything that no longer exists. */
export function resolvedLines(): ResolvedLine[] {
  return getCart().flatMap((line, index) => {
    const product = getProduct(line.slug);
    const color = product?.colors.find((c) => c.name === line.color);
    if (!product || !color || !product.sizes.includes(line.size)) return [];
    return [
      {
        index,
        line,
        product,
        label: colorLabel(product.category, color.name),
        image: color.image,
        url: productUrl(product, color.name),
      },
    ];
  });
}

export function toOrderLines(lines: ResolvedLine[]): OrderLine[] {
  return lines.map((l) => ({
    name: l.label,
    color: l.line.color,
    size: l.line.size,
    qty: l.line.qty,
    price: l.product.price,
    url: absoluteUrl(l.url),
  }));
}

export function bagTotal(lines: ResolvedLine[]) {
  return lines.reduce((sum, l) => sum + l.product.price * l.line.qty, 0);
}
