import fs from 'fs'
import React from 'react'
import matter from 'gray-matter'
import { postsDirectory } from '../../src/constants'
import format from 'date-fns/fp/format'
import parseISO from 'date-fns/fp/parseISO'
import Link from 'next/link'
import { Link as MuiLink } from '@material-ui/core'
import Layout from '../../components/Layout'
import BlogPost from '../../types/post'

interface Props {
  posts: BlogPost[]
}

const Home: React.FC<Props> = ({ posts }: Props) => {
  return (
    <Layout>
      <div>
        {posts.map(({ title, excerpt, date, slug }) => (
          <article key={title}>
            <header>
              <h3>{title}</h3>
              <span>{date}</span>
            </header>
            <section>
              <p>{excerpt}</p>
              <Link href={`/blog/${slug}`} passHref>
                <MuiLink>View post</MuiLink>
              </Link>
            </section>
          </article>
        ))}
      </div>
    </Layout>
  )
}

export default Home

export async function getStaticProps() {
  const files = fs.readdirSync(postsDirectory)

  const posts = files.map((filename) => {
    const markdownWithMetadata = fs
      .readFileSync(`${postsDirectory}/${filename}`)
      .toString()

    const { data } = matter(markdownWithMetadata)

    // Convert post date to format: Month day, Year
    const formattedDate = format('PPP', parseISO(data.date))

    return {
      ...data,
      slug: filename.replace('.md', ''),
      date: formattedDate,
    }
  })

  return {
    props: {
      posts,
    },
  }
}
