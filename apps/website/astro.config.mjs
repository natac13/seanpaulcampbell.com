import react from '@astrojs/react'
import aws from 'astro-sst'
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: aws({
    responseMode: 'stream',
  }),
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
    remarkPlugins: [],
    rehypePlugins: [],
  },
  // // Enable drafts for development
  // experimental: {
  //   contentCollectionCache: true,
  // },
})
