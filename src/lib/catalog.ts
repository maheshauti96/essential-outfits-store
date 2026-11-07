import { site } from '../config';
import type { CategorySlug, Product } from '../data/products';

export const formatPrice = (amount: number) => `₹${amount.toLocaleString(site.locale)}`;

/** The catalogue price is the sale price. The original shown beside it is double, so every item reads as 50% off. */
export const originalPrice = (sale: number) => sale * 2;

/** Fills an element with a struck-through original and the sale price. Client only. */
export function renderSalePrice(el: HTMLElement, sale: number) {
  el.classList.add('price-pair');
  const was = document.createElement('s');
  was.className = 'price-was';
  was.textContent = formatPrice(originalPrice(sale));
  const now = document.createElement('span');
  now.className = 'price-now';
  now.textContent = formatPrice(sale);
  el.replaceChildren(was, now);
}

/** Shirts are labelled "Burgundy Shirt"; trouser colours already include the garment. */
export const colorLabel = (category: CategorySlug, color: string) =>
  category === 'shirts' ? `${color} Shirt` : color;

export const productUrl = (product: Product, color?: string) => {
  const path = `/product/${product.slug}/`;
  return color ? `${path}?colour=${encodeURIComponent(color)}` : path;
};

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();
