// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://divebarn.com',
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
        strict: true
      }
    }
  }
});
