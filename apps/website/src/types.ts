export interface Site {
  title: string
  description: string
  href: string
  author: string
  locale: string
  recentPostCount: number
  postsPerPage: number
}

export interface SocialLink {
  href: string
  label: string
}
