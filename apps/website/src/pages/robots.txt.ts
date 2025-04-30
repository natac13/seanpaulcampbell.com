import type { APIContext } from 'astro'

function getRobotsTxt(sitemapUrl: URL) {
  return `User-agent: *
Allow: /

Sitemap: ${sitemapUrl.href}
`
}

export function GET(context: APIContext) {
  const sitemapUrl = new URL('/sitemap-index.xml', context.site?.toString())
  return new Response(getRobotsTxt(sitemapUrl))
}
