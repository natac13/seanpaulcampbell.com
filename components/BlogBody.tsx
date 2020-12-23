import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rui from 'remark-unwrap-images'
import oembed from '@agentofuser/remark-oembed'
import Code from './BlogCode'
import Image from './BlogImage'
import BlogLink from './BlogLink'

interface Props {
  content: string
}

const BlogBody: React.FC<Props> = (props: Props) => {
  const { content } = props

  return (
    <ReactMarkdown
      plugins={[gfm, rui, oembed]}
      renderers={{
        code: Code,
        image: Image,
        imageReference: Image,
        link: BlogLink,
        linkReference: BlogLink,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export default BlogBody
