import { type CollectionEntry, getCollection } from 'astro:content'
import { SITE } from '../constants'

export async function getAllPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog')
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime())
}

export async function getRecentPosts(limit = 5): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getAllPosts()
  return posts.slice(0, limit)
}

export async function getPostBySlug(slug: string): Promise<CollectionEntry<'blog'> | null> {
  const posts = await getAllPosts()
  return posts.find((post) => post.id === slug) || null
}

export async function getAdjacentPosts(
  id: string,
): Promise<{ previous: CollectionEntry<'blog'> | null; next: CollectionEntry<'blog'> | null }> {
  const posts = await getAllPosts()
  const index = posts.findIndex((post) => post.id === id)
  if (index === -1) {
    return { previous: null, next: null }
  }
  return {
    next: index > 0 ? posts[index - 1] : null,
    previous: index < posts.length - 1 ? posts[index + 1] : null,
  }
}

export async function getAllTags(): Promise<Array<{ tag: string; count: number }>> {
  const posts = await getAllPosts()
  const tags = new Map<string, number>()
  for (const post of posts) {
    for (const tag of post.data.tags || []) {
      tags.set(tag, (tags.get(tag) || 0) + 1)
    }
  }
  return Array.from(tags.entries()).map(([tag, count]) => ({ tag, count }))
}

export async function getSortedTags(): Promise<Array<{ tag: string; count: number }>> {
  const tags = await getAllTags()
  return tags.sort((a, b) => b.count - a.count)
}

export async function groupPostsByYear(
  posts: CollectionEntry<'blog'>[],
): Promise<Record<string, CollectionEntry<'blog'>[]>> {
  const grouped = posts.reduce(
    (acc, post) => {
      const year = post.data.publishDate.getFullYear().toString()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(post)
      return acc
    },
    {} as Record<string, CollectionEntry<'blog'>[]>,
  )
  return grouped
}

export async function getPostsByYear(year: string): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.data.publishDate.getFullYear().toString() === year)
}

export async function getPostsByTag(tag: string): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.data.tags?.includes(tag))
}

export interface FilteredPostsResult {
  posts: CollectionEntry<'blog'>[]
  totalPages: number
}

export async function getFilteredPosts(
  tag?: string | null,
  searchTerm?: string | null,
  page = 1,
  postsPerPage = SITE.postsPerPage,
): Promise<FilteredPostsResult> {
  const allPosts = await getAllPosts()

  // Filter posts based on criteria
  const filteredPosts = allPosts.filter((post) => {
    // Filter by tag if provided
    const tagMatches = !tag || tag === 'all' || post.data.tags?.includes(tag)

    // Filter by search term if provided
    let searchMatches = true
    if (searchTerm) {
      const normalizedSearch = searchTerm.toLowerCase()
      const title = post.data.title.toLowerCase()
      const description = (post.data.description || '').toLowerCase()
      const content = (post.body || '').toLowerCase()
      searchMatches =
        title.includes(normalizedSearch) ||
        description.includes(normalizedSearch) ||
        content.includes(normalizedSearch)
    }

    return tagMatches && searchMatches
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (page - 1) * postsPerPage
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  return {
    posts: paginatedPosts,
    totalPages,
  }
}
