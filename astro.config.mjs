// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://essentialoutfits.store',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  redirects: {
    '/shop': '/shirts',
    '/shop/t-shirts': '/shirts',
    '/shop/polos': '/shirts',
    '/shop/shirts': '/shirts',
    '/shop/hoodies-sweatshirts': '/shirts',
    '/shop/trousers': '/trousers',
    '/shop/shorts': '/trousers',
    '/shop/jackets': '/shirts',
    '/privacy': '/privacy-policy',
    '/shipping-returns': '/shipping-policy',
    '/terms': '/privacy-policy',
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/(cart|search|404)\/?$/.test(page),
    }),
  ],
});
