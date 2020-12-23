import Author from './author'

interface BlogPost {
  slug: string
  title: string
  date: string
  coverImage?: string
  author: Author
  excerpt?: string
  ogImage?: {
    url?: string
  }
  content: string
  readTime: string
  wordCount: number
}

export default BlogPost
