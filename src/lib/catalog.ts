import { site } from '../config';
import type { GarmentType } from './garments';
import type { Product, ProductColor } from '../data/products';

const inr = new Intl.NumberFormat(site.locale, {
  style: 'currency',
  currency: site.currency,
  maximumFractionDigits: 0,
});

export const formatPrice = (amount: number) => inr.format(amount);

export const garmentImage = (garment: GarmentType, hex: string) =>
  `/images/${garment}/${hex.replace('#', '').toLowerCase()}.svg`;

/** Real photo if one is set for the colour, otherwise the drawn placeholder. */
export const imageFor = (product: Product, color: ProductColor = product.colors[0]!) =>
  color.image ?? garmentImage(product.garment, color.hex);

export const productUrl = (product: Product) => `/products/${product.slug}/`;

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();

/**
 * Decorative illustrations used on the home, About and 404 pages. Listed here
 * so they're always generated, even if catalogue colours change.
 */
export const art = {
  heroShirt: garmentImage('shirt', '#B9CBE0'),
  heroTrousers: garmentImage('trousers', '#C2A878'),
  heroTee: garmentImage('tee', '#EEEAE1'),
  aboutJacket: garmentImage('jacket', '#5C6B4E'),
  aboutPolo: garmentImage('polo', '#2F4A3A'),
  notFound: garmentImage('tee', '#D8C7A6'),
} as const;
