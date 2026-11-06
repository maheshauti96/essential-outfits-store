/**
 * The catalogue. This is the only file you need to edit to add, change or
 * remove products.
 *
 * - `price` is in rupees, as a whole number.
 * - `garment` picks the drawn placeholder image used until you add photos.
 * - To use a real photo for a colour, put the file in /public/products/ and set
 *   `image: '/products/your-file.jpg'` on that colour (4:5 portrait works best).
 */
import type { GarmentType } from '../lib/garments';

export type CategorySlug =
  | 't-shirts'
  | 'polos'
  | 'shirts'
  | 'hoodies-sweatshirts'
  | 'trousers'
  | 'shorts'
  | 'jackets';

export interface Category {
  slug: CategorySlug;
  name: string;
  blurb: string;
  garment: GarmentType;
  color: string;
}

export interface ProductColor {
  name: string;
  hex: string;
  /** Optional real photo for this colour, e.g. '/products/oxford-white.jpg'. */
  image?: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  /** Optional original price, shown struck through when higher than `price`. */
  compareAtPrice?: number;
  garment: GarmentType;
  colors: ProductColor[];
  sizes: string[];
  summary: string;
  details: string[];
  featured?: boolean;
  /** Set to true to show the product as sold out. */
  soldOut?: boolean;
}

export const categories: Category[] = [
  { slug: 't-shirts', name: 'T-Shirts', blurb: 'Crew necks and pocket tees for every day.', garment: 'tee', color: '#E9E4DA' },
  { slug: 'polos', name: 'Polos', blurb: 'A collar when you need one.', garment: 'polo', color: '#2F4A3A' },
  { slug: 'shirts', name: 'Shirts', blurb: 'Oxford, linen and casual button-downs.', garment: 'shirt', color: '#B9CBE0' },
  { slug: 'hoodies-sweatshirts', name: 'Hoodies & Sweatshirts', blurb: 'Soft layers for cooler days.', garment: 'hoodie', color: '#8C8C88' },
  { slug: 'trousers', name: 'Trousers', blurb: 'Chinos and joggers that go with everything.', garment: 'trousers', color: '#C2A878' },
  { slug: 'shorts', name: 'Shorts', blurb: 'For the long Indian summer.', garment: 'shorts', color: '#5C6B4E' },
  { slug: 'jackets', name: 'Jackets', blurb: 'Overshirts and light outer layers.', garment: 'jacket', color: '#3B3A36' },
];

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export const products: Product[] = [
  // T-shirts
  {
    slug: 'everyday-crew-tee',
    name: 'Everyday Crew Tee',
    category: 't-shirts',
    price: 699,
    garment: 'tee',
    colors: [
      { name: 'Off White', hex: '#EEEAE1' },
      { name: 'Black', hex: '#1E1E1E' },
      { name: 'Navy', hex: '#1F2A44' },
      { name: 'Olive', hex: '#5C6B4E' },
    ],
    sizes: SIZES,
    summary: 'The plain crew-neck tee you reach for first. Regular fit, soft cotton, works on its own or under a shirt.',
    details: ['Regular fit', 'Crew neck', 'Cotton jersey', 'Machine wash cold'],
    featured: true,
  },
  {
    slug: 'heavyweight-pocket-tee',
    name: 'Heavyweight Pocket Tee',
    category: 't-shirts',
    price: 899,
    garment: 'tee-pocket',
    colors: [
      { name: 'Sand', hex: '#D8C7A6' },
      { name: 'Charcoal', hex: '#3A3B3D' },
      { name: 'Rust', hex: '#A4532F' },
    ],
    sizes: SIZES,
    summary: 'A thicker tee with a structured drape and a chest pocket. Slightly relaxed through the body.',
    details: ['Relaxed fit', 'Chest pocket', 'Heavyweight cotton', 'Machine wash cold'],
  },

  // Polos
  {
    slug: 'pique-polo',
    name: 'Piqué Polo',
    category: 'polos',
    price: 1199,
    garment: 'polo',
    colors: [
      { name: 'Forest', hex: '#2F4A3A' },
      { name: 'White', hex: '#F4F2EE' },
      { name: 'Navy', hex: '#1F2A44' },
    ],
    sizes: SIZES,
    summary: 'A classic three-button polo in textured piqué. Smart enough for the office, easy enough for the weekend.',
    details: ['Regular fit', 'Three-button placket', 'Ribbed collar and cuffs', 'Cotton piqué'],
    featured: true,
  },
  {
    slug: 'knit-polo',
    name: 'Knit Polo',
    category: 'polos',
    price: 1499,
    garment: 'polo',
    colors: [
      { name: 'Camel', hex: '#B08A5B' },
      { name: 'Ecru', hex: '#E6DDC8' },
    ],
    sizes: SIZES,
    summary: 'A fine-knit polo with a softer collar. Dresses up a pair of chinos without trying too hard.',
    details: ['Regular fit', 'Fine knit', 'Soft collar', 'Hand wash or gentle cycle'],
  },

  // Shirts
  {
    slug: 'oxford-shirt',
    name: 'Oxford Button-Down Shirt',
    category: 'shirts',
    price: 1599,
    garment: 'shirt',
    colors: [
      { name: 'Light Blue', hex: '#B9CBE0' },
      { name: 'White', hex: '#F4F2EE' },
      { name: 'Pink', hex: '#E7C3BE' },
    ],
    sizes: SIZES,
    summary: 'The button-down that does everything: tucked in for work, open over a tee on the weekend.',
    details: ['Regular fit', 'Button-down collar', 'Oxford cotton', 'Machine wash, warm iron'],
    featured: true,
  },
  {
    slug: 'linen-blend-shirt',
    name: 'Linen-Blend Shirt',
    category: 'shirts',
    price: 1899,
    garment: 'shirt',
    colors: [
      { name: 'Natural', hex: '#DCCFB6' },
      { name: 'Sage', hex: '#9DAA8C' },
      { name: 'White', hex: '#F4F2EE' },
    ],
    sizes: SIZES,
    summary: 'A breathable linen-blend shirt made for heat and humidity. Gets better with every wash.',
    details: ['Relaxed fit', 'Linen-cotton blend', 'Curved hem', 'Machine wash cold'],
    featured: true,
  },

  // Hoodies & sweatshirts
  {
    slug: 'classic-hoodie',
    name: 'Classic Pullover Hoodie',
    category: 'hoodies-sweatshirts',
    price: 1999,
    garment: 'hoodie',
    colors: [
      { name: 'Grey Melange', hex: '#8C8C88' },
      { name: 'Black', hex: '#1E1E1E' },
      { name: 'Bottle Green', hex: '#24402F' },
    ],
    sizes: SIZES,
    summary: 'A soft brushed-back hoodie with a lined hood and a kangaroo pocket.',
    details: ['Regular fit', 'Lined hood with drawcords', 'Kangaroo pocket', 'Brushed fleece'],
    featured: true,
  },
  {
    slug: 'crew-sweatshirt',
    name: 'Crew Sweatshirt',
    category: 'hoodies-sweatshirts',
    price: 1499,
    garment: 'sweatshirt',
    colors: [
      { name: 'Oatmeal', hex: '#D9CFBD' },
      { name: 'Navy', hex: '#1F2A44' },
    ],
    sizes: SIZES,
    summary: 'A clean crew-neck sweatshirt with ribbed cuffs and hem. Layer it over a shirt collar.',
    details: ['Regular fit', 'Ribbed cuffs and hem', 'Loopback cotton', 'Machine wash cold'],
  },

  // Trousers
  {
    slug: 'slim-chinos',
    name: 'Slim Stretch Chinos',
    category: 'trousers',
    price: 1799,
    garment: 'trousers',
    colors: [
      { name: 'Khaki', hex: '#C2A878' },
      { name: 'Navy', hex: '#1F2A44' },
      { name: 'Olive', hex: '#5C6B4E' },
      { name: 'Stone', hex: '#CFC6B6' },
    ],
    sizes: ['28', '30', '32', '34', '36', '38'],
    summary: 'Slim through the leg with a little stretch for comfort. Pairs with every top in the shop.',
    details: ['Slim fit', 'Cotton with stretch', 'Zip fly, button waist', 'Machine wash cold'],
    featured: true,
  },
  {
    slug: 'everyday-joggers',
    name: 'Everyday Joggers',
    category: 'trousers',
    price: 1299,
    garment: 'joggers',
    colors: [
      { name: 'Charcoal', hex: '#3A3B3D' },
      { name: 'Black', hex: '#1E1E1E' },
    ],
    sizes: SIZES,
    summary: 'Tapered joggers with an elastic waist and cuffed ankles. For travel, home and everything in between.',
    details: ['Tapered fit', 'Elastic waist with drawcord', 'Side pockets', 'Machine wash cold'],
  },

  // Shorts
  {
    slug: 'chino-shorts',
    name: 'Chino Shorts',
    category: 'shorts',
    price: 999,
    garment: 'shorts',
    colors: [
      { name: 'Olive', hex: '#5C6B4E' },
      { name: 'Sand', hex: '#D8C7A6' },
      { name: 'Navy', hex: '#1F2A44' },
    ],
    sizes: ['28', '30', '32', '34', '36'],
    summary: 'Above-the-knee chino shorts with a clean front. Smart enough for brunch.',
    details: ['Regular fit', '7-inch inseam', 'Zip fly, button waist', 'Machine wash cold'],
    featured: true,
  },
  {
    slug: 'lounge-shorts',
    name: 'Lounge Shorts',
    category: 'shorts',
    price: 799,
    garment: 'shorts',
    colors: [
      { name: 'Grey Melange', hex: '#8C8C88' },
      { name: 'Black', hex: '#1E1E1E' },
    ],
    sizes: SIZES,
    summary: 'Soft knit shorts with an elastic waist. Made for weekends at home.',
    details: ['Relaxed fit', 'Elastic waist with drawcord', 'Side pockets', 'Machine wash cold'],
  },

  // Jackets
  {
    slug: 'utility-overshirt',
    name: 'Utility Overshirt',
    category: 'jackets',
    price: 2499,
    garment: 'jacket',
    colors: [
      { name: 'Olive', hex: '#5C6B4E' },
      { name: 'Charcoal', hex: '#3A3B3D' },
      { name: 'Tan', hex: '#A88660' },
    ],
    sizes: SIZES,
    summary: 'A sturdy overshirt with two chest pockets. Wear it as a shirt or as a light jacket.',
    details: ['Regular fit', 'Two chest pockets', 'Cotton twill', 'Machine wash cold'],
    featured: true,
  },
  {
    slug: 'harrington-jacket',
    name: 'Harrington Jacket',
    category: 'jackets',
    price: 2999,
    garment: 'jacket-zip',
    colors: [
      { name: 'Navy', hex: '#1F2A44' },
      { name: 'Stone', hex: '#CFC6B6' },
    ],
    sizes: SIZES,
    summary: 'A lightweight zip-front jacket with a ribbed hem. The finishing layer for cooler evenings.',
    details: ['Regular fit', 'Full zip', 'Ribbed cuffs and hem', 'Lightweight shell'],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsIn(category: CategorySlug): Product[] {
  return products.filter((p) => p.category === category);
}
