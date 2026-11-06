/**
 * The catalogue. Colours are photos in /public/products. Each colour is shown
 * as its own card in the shop, and shares one product page.
 *
 * `price` is in rupees, as a whole number.
 */
export type CategorySlug = 'shirts' | 'trousers';

export interface Category {
  slug: CategorySlug;
  name: string;
  eyebrow: string;
  blurb: string;
  image: string;
}

export interface ProductColor {
  name: string;
  image: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  colors: ProductColor[];
  sizes: string[];
  summary: string;
}

export const categories: Category[] = [
  {
    slug: 'shirts',
    name: 'Shirts',
    eyebrow: 'The Shirt Collection',
    blurb: 'Six timeless colours in premium cotton.',
    image: '/products/p-forest.jpg',
  },
  {
    slug: 'trousers',
    name: 'Trousers',
    eyebrow: 'The Trouser Collection',
    blurb: 'Tailored trousers and stretch denim.',
    image: '/products/t-beige.jpg',
  },
];

const SIZES = ['M', 'L', 'XL'];

export const products: Product[] = [
  {
    slug: 'the-essential-shirt',
    name: 'The Essential Shirt',
    category: 'shirts',
    price: 869,
    colors: [
      { name: 'Burgundy', image: '/products/p-burgundy.jpg' },
      { name: 'Sky Blue', image: '/products/p-skyblue.jpg' },
      { name: 'White', image: '/products/p-white.jpg' },
      { name: 'Black', image: '/products/p-black.jpg' },
      { name: 'Forest Green', image: '/products/p-forest.jpg' },
      { name: 'Army Green', image: '/products/p-army.jpg' },
    ],
    sizes: SIZES,
    summary:
      'Premium cotton shirt with a tailored, modern fit. Breathable, soft-touch fabric designed for college, office and everyday wear. Classic collar, single chest pocket, refined button placket.',
  },
  {
    slug: 'the-essential-trousers',
    name: 'The Essential Trousers',
    category: 'trousers',
    price: 1559,
    colors: [
      { name: 'Beige Trousers', image: '/products/t-beige.jpg' },
      { name: 'Black Trousers', image: '/products/t-black.jpg' },
      { name: 'White Trousers', image: '/products/t-white.jpg' },
      { name: 'Blue Jeans', image: '/products/t-bluejeans.jpg' },
      { name: 'Black Stretchable Jeans', image: '/products/t-blackjeans.jpg' },
    ],
    sizes: SIZES,
    summary:
      'Tailored trousers and premium stretch denim cut for a clean, sharp silhouette. Durable cotton-blend fabric with a hint of stretch for all-day comfort, from lecture halls to boardrooms.',
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productByCategory(category: CategorySlug): Product {
  const product = products.find((p) => p.category === category);
  if (!product) throw new Error(`Missing product for ${category}`);
  return product;
}
