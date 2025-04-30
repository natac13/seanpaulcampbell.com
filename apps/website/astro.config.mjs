import react from '@astrojs/react'
import aws from 'astro-sst'
import { defineConfig } from 'astro/config'
import { Resource } from 'sst/resource'

import tailwindcss from '@tailwindcss/vite'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site:
    Resource.App.stage !== 'production'
      ? 'https://dev.seanpaulcampbell.com'
      : 'https://seanpaulcampbell.com',
  output: 'server',
  adapter: aws(),
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    '/sitemap.xml': '/sitemap-index.xml',
    '/rss': '/rss.xml',
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
    gfm: true,
    syntaxHighlight: 'shiki',
  },
})
