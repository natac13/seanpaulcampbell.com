import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import aws from 'astro-sst'
import { defineConfig } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'

import sitemap from '@astrojs/sitemap'

import expressiveCode from 'astro-expressive-code'

// https://astro.build/config
export default defineConfig({
  site: 'https://seanpaulcampbell.com',
  output: 'server',
  adapter: aws(),
  integrations: [
    react(),
    sitemap(),
    expressiveCode({
      themes: ['github-light', 'github-dark'],
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) => `.${theme.name.split('-')[1]}`,
      defaultProps: {
        wrap: false,
      },
    }),
  ],
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
      // wrap: true,
    },
    remarkPlugins: [],
    rehypePlugins: [
      rehypeHeadingIds,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['blog-post-heading'],
          },
        },
      ],
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noopener', 'noreferrer'],
        },
      ],
    ],
    gfm: true,
    // syntaxHighlight: 'shiki',
    syntaxHighlight: false,
  },
})
