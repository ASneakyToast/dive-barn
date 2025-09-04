// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: netlify(),
  site: 'https://divebarn.org',
  build: {
    inlineStylesheets: 'auto',
    assets: 'assets'
  },
  vite: {
    define: {
      __DEFINES__: {}
    },
    server: {
      fs: {
        strict: false
      }
    }
  }
});
