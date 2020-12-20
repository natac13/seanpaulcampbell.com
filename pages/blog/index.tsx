import fs from 'fs'
import React from 'react'
import matter from 'gray-matter'
import { postsDirectory } from '../../src/constants'
import format from 'date-fns/fp/format'
import parseISO from 'date-fns/fp/parseISO'
import Link from 'next/link'
import { Link as MuiLink } from '@material-ui/core'
import Layout from '../../components/Layout'

export default function Home({ posts }) {
  return (
    <Layout>
      <div>
        {posts.map(({ frontmatter: { title, description, date }, slug }) => (
          <article key={title}>
            <header>
              <h3>{title}</h3>
              <span>{date}</span>
            </header>
            <section>
              <p>{description}</p>
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

export async function getStaticProps() {
  const files = fs.readdirSync(postsDirectory)

  const posts = files.map((filename) => {
    const markdownWithMetadata = fs
      .readFileSync(`${postsDirectory}/${filename}`)
      .toString()

    const { data } = matter(markdownWithMetadata)

    // Convert post date to format: Month day, Year
    console.log(data)
    const formattedDate = format('PP', parseISO(data.date))

    const frontmatter = {
      ...data,
      date: formattedDate,
    }

    return {
      slug: filename.replace('.md', ''),
      frontmatter,
    }
  })

  return {
    props: {
      posts,
    },
  }
}
