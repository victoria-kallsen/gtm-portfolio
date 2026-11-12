import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// TODO: set to the real domain once chosen
export default defineConfig({
  site: 'https://example.com',
  output: 'static', // pages are prerendered; only /api/brief runs as a function
  adapter: vercel({ maxDuration: 120 }),
});
