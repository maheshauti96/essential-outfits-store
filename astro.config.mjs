// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://essentialoutfits.store',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // Keep utility pages out of search results.
      filter: (page) => !/\/(cart|404)\/?$/.test(page),
    }),
  ],
});
