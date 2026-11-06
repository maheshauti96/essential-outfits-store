import type { APIRoute, GetStaticPaths } from 'astro';
import { categories, products } from '../../../data/products';
import { garmentSvg, type GarmentType } from '../../../lib/garments';
import { art } from '../../../lib/catalog';

/** Builds one placeholder image per garment + colour used anywhere in the catalogue. */
export const getStaticPaths: GetStaticPaths = () => {
  const combos = new Map<string, { garment: GarmentType; hex: string }>();
  const add = (garment: GarmentType, hex: string) => {
    const key = `${garment}/${hex.replace('#', '').toLowerCase()}`;
    combos.set(key, { garment, hex });
  };
  for (const p of products) for (const c of p.colors) add(p.garment, c.hex);
  for (const c of categories) add(c.garment, c.color);
  for (const src of Object.values(art)) {
    const [, , garment, file] = src.split('/');
    add(garment as GarmentType, `#${file!.replace('.svg', '')}`);
  }

  return [...combos.values()].map(({ garment, hex }) => ({
    params: { garment, hex: hex.replace('#', '').toLowerCase() },
    props: { garment, hex },
  }));
};

export const GET: APIRoute = ({ props }) =>
  new Response(garmentSvg(props.garment as GarmentType, props.hex as string), {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
