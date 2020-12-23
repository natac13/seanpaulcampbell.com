import React from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getPostBySlug, getAllPosts } from '../../lib/posts'
import BlogPost from '../../types/post'
import BlogLayout from '../../components/BlogLayout'
import BlogBody from '../../components/BlogBody'
import { Avatar, Box, Typography, Paper } from '@material-ui/core'
import { DateFormatter } from '../../components/DateFormatter'
import Image from 'next/image'
import BlogImage from '../../components/BlogImage'

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
      <Box
        component="header"
        sx={{
          gridColumn: '1 / -1',
          placeSelf: 'center center',
          textAlign: 'center',
          my: 2,
        }}
      >
        <Typography variant="h1">{post.title}</Typography>
      </Box>

      {post.coverImage ? (
        <BlogImage src={post.coverImage} alt={post.title} />
      ) : null}

      <Paper
        css={(theme) => ({
          display: 'flex',
          gap: theme.spacing(1),
          flexDirection: 'column',
          padding: theme.spacing(1, 2),
        })}
      >
        <Box sx={{ display: 'flex', gap: (theme) => theme.spacing(1) }}>
          <DateFormatter dateString={post.date} />
          <Typography variant="subtitle1" color="textSecondary">
            -
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {post.readTime}
          </Typography>
          {/* <Typography */}
          {/*   variant="subtitle1" */}
          {/*   color="textSecondary" */}
          {/* >{`Word Count: ${post.wordCount}`}</Typography> */}
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: (theme) => theme.spacing(2),
            alignItems: 'center',
          }}
        >
          <Box
            component={Avatar}
            alt={post.author.name}
            src={post.author.picture}
            sx={{
              width: (theme) => theme.spacing(8),
              height: (theme) => theme.spacing(8),
            }}
          />
          <Typography variant="h5" component="h2">
            {post.author.name}
          </Typography>
        </Box>
      </Paper>

      <BlogBody content={post.content} />
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
    'coverImage',
  ])

  return { props: { post } }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((posts) => {
      return {
        params: { slug: posts.slug },
      }
    }),
    fallback: false,
  }
}
