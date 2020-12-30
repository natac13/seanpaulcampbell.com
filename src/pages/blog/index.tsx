import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@material-ui/core'
import { graphql, PageProps } from 'gatsby'
import React from 'react'
import format from 'date-fns/fp/format'
import parseISO from 'date-fns/fp/parseISO'
import Layout from '../../components/Layout'
import { BlogIndexQuery } from '../../types/generated-gatsby'
import Img from 'gatsby-image'
import { Button } from 'gatsby-material-ui-components'
import { ArrowRightAlt, KeyboardArrowRight } from '@material-ui/icons'

type Props = PageProps & { data: BlogIndexQuery }

const BlogIndex: React.FC<Props> = (props: Props) => {
  const { data } = props
  const posts = data.allMdx.nodes
  console.log(props)

  const postDisplay = posts.map((post) => (
    <Card key={post.id}>
      <CardMedia
        // @ts-ignore
        component={Img}
        fluid={post?.frontmatter?.coverImage?.childImageSharp?.fluid}
        alt={post?.frontmatter?.title}
      />
      <CardHeader
        title={post?.frontmatter?.title}
        subheader={`${post?.frontmatter?.date} - ${post.timeToRead} min read`}
      />
      <CardContent>
        <Typography>{post.excerpt}</Typography>
      </CardContent>
      <CardActions>
        <Button endIcon={<ArrowRightAlt />} to={`blog/${post.slug}`}>
          Read More
        </Button>
      </CardActions>
    </Card>
  ))
  return <Layout>{postDisplay}</Layout>
}

export const query = graphql`
  query BlogIndex {
    allMdx {
      nodes {
        id
        excerpt
        timeToRead
        slug
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          tags
          category
          coverImage {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

export default BlogIndex
