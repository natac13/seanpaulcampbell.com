import { MailIcon, RssIcon } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon } from './components/brand-icons'
import type { Site, SocialLink } from './types'

export const SITE: Site = {
  title: `Sean Campbell's Blog`,
  description: 'My blog about coding, software development, and the technologies I like to use.',
  href: 'https://seanpaulcampbell.com',
  author: 'Sean Campbell',
  locale: 'en-US',
  recentPostCount: 3,
  postsPerPage: 10,
}

/** Post the home page route marks "new here? start with this one". */
export const START_HERE_POST_ID = 'aws-bedrock-knowledge-base-sst'

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'Writing',
  },
  {
    href: '/about',
    label: 'About',
  },
  // {
  //   href: '/rss.xml',
  //   label: 'RSS',
  // },
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
