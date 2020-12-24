import fs from 'fs'
import readingTime from 'reading-time'
import { join } from 'path'
import matter from 'gray-matter'
import BlogPost from '../types/post'

const postsDirectory = join(process.cwd(), '_blog')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string, detailed = false) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const readStats = readingTime(content)
  const blogPost: BlogPost = {
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    slug: realSlug,
    author: data.author,
  }

  if (detailed) {
    blogPost.content = content
    blogPost.readTime = readStats.text
    blogPost.wordCount = readStats.words
    blogPost.coverImage = data.coverImage
  }

  return blogPost
}

export function getAllPosts() {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2!.date ? -1 : 1))
  return posts
}
