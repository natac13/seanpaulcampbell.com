/** Short date like "Mar 4, 2025". UTC, because frontmatter dates parse as UTC midnight. */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
