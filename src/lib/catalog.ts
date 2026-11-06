import { site } from '../config';
import type { CategorySlug, Product } from '../data/products';

export const formatPrice = (amount: number) => `₹${amount.toLocaleString(site.locale)}`;

/** Shirts are labelled "Burgundy Shirt"; trouser colours already include the garment. */
export const colorLabel = (category: CategorySlug, color: string) =>
  category === 'shirts' ? `${color} Shirt` : color;

export const productUrl = (product: Product, color?: string) => {
  const path = `/product/${product.slug}/`;
  return color ? `${path}?colour=${encodeURIComponent(color)}` : path;
};

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();
