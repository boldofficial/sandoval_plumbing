// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://sandovalplumbingchicago.com',
  integrations: [react(), sitemap(), mdx()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false, // English at /, Spanish at /es/
    },
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  output: 'static', // Full static build
});
