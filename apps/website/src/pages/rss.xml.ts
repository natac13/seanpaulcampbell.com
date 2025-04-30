import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'
import { SITE } from '../constants'

const parser = new MarkdownIt()

export async function GET(context: APIContext) {
  const blog = await getCollection('blog')
  return rss({
    title: SITE.title,
    description: SITE.description,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: context.site?.toString() ?? SITE.href,
    // Array of `<item>`s in output xml
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/blog/${post.id}`,
      // Include the full post content, sanitized
      categories: post.data.tags,
      content: post.body
        ? sanitizeHtml(parser.render(post.body), {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
          })
        : '',
    })),
    // (optional) inject custom xml
    customData: '<language>en-us</language>',
    // Use trailingSlash: false if your Astro config has trailingSlash: 'never'
    // trailingSlash: false,
    // Use stylesheet if you want to style the RSS feed
    stylesheet: '/rss/styles.xsl',
  })
}
