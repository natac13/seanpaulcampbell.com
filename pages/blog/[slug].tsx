import React from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getPostBySlug, getAllPosts } from '../../lib/posts'
import BlogPost from '../../types/post'
import BlogLayout from '../../components/BlogLayout'
import Code from '../../components/Code'
import Image from '../../components/Image'
import ReactMarkdown from 'react-markdown'
// @ts-ignore
import rui from 'remark-unwrap-images'
import gfm from 'remark-gfm'

type Props = {
  post: BlogPost
  morePosts: BlogPost[]
  preview?: boolean
}

const Post = ({ post, morePosts, preview }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <BlogLayout>
      <ReactMarkdown
        plugins={[gfm, rui]}
        renderers={{
          code: Code,
          image: Image,
        }}
      >
        {post.content}
      </ReactMarkdown>
    </BlogLayout>
  )
}

export default Post

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  // const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        // content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: posts.slug,
        },
      }
    }),
    fallback: false,
  }
}
