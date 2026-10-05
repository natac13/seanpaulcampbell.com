import type { CollectionEntry } from 'astro:content'
import { START_HERE_POST_ID } from '../constants'
import { calculateReadingTime } from './readingTime'

/** One post on the route list: the post, its reading time, and an optional handwritten margin note. */
export interface RouteCheckpoint {
  readonly post: CollectionEntry<'blog'>
  readonly minutes: number
  readonly note: string | undefined
}

/**
 * Builds checkpoints for posts in the order given. Notes only state things true from the
 * data, and a post gets at most one: the start-here post wins over the longest post.
 */
export function toCheckpoints(posts: readonly CollectionEntry<'blog'>[]): RouteCheckpoint[] {
  const timed = posts.map((post) => ({ post, minutes: calculateReadingTime(post.body ?? '') }))
  const longest = timed.reduce<(typeof timed)[number] | undefined>(
    (max, c) => (max === undefined || c.minutes > max.minutes ? c : max),
    undefined,
  )
  return timed.map(({ post, minutes }) => ({
    post,
    minutes,
    note: noteFor(post.id, minutes, longest?.post.id),
  }))
}

function noteFor(id: string, minutes: number, longestId: string | undefined): string | undefined {
  if (id === START_HERE_POST_ID) return 'new here? start with this one'
  if (id === longestId) return `the long one, ${minutes} min`
  return undefined
}
