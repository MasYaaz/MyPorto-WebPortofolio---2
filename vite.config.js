import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/MyPorto-WebPortofolio/',
  plugins: [
    svelte(),
    tailwindcss(),
  ],
})
