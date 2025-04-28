import { GithubIcon, LinkedinIcon, MailIcon, RssIcon, TwitterIcon } from 'lucide-react'
import type { Site, SocialLink } from './types'

export const SITE: Site = {
  title: 'Sean Campbell',
  description: 'My blog about coding, software development, and the technologies I like to use.',
  href: 'https://seanpaulcampbell.com',
  author: 'Sean Campbell',
  locale: 'en-US',
  recentPostCount: 3,
  postsPerPage: 10,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/blog',
    label: 'Blog',
  },
  {
    href: '/about',
    label: 'About',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/natac13',
    label: 'GitHub',
  },
  {
    href: 'https://twitter.com/natac131',
    label: 'X',
  },
  {
    href: 'https://www.linkedin.com/in/seancampbellnatac/',
    label: 'LinkedIn',
  },
]

export const ICON_MAP: Record<string, React.ElementType> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  X: TwitterIcon,
  Email: MailIcon,
  RSS: RssIcon,
}
