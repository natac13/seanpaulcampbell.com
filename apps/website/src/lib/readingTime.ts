/**
 * Calculate estimated reading time for text content
 * @param content Post content as string
 * @param wordsPerMinute Average reading speed (default: 200 words per minute)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(content: string, wordsPerMinute = 200): number {
  // Remove all HTML tags
  const plainText = content.replace(/<\/?[^>]+(>|$)/g, '')

  // Count words by splitting on whitespace
  const wordCount = plainText.split(/\s+/).filter((word) => word.length > 0).length

  // Calculate reading time
  const readingTime = Math.ceil(wordCount / wordsPerMinute)

  // Return at least 1 minute
  return Math.max(1, readingTime)
}
