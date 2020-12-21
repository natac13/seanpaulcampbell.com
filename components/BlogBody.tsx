import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rui from 'remark-unwrap-images'
import Code from './BlogCode'
import Image from './BlogImage'

interface Props {
  content: string
}

const BlogBody: React.FC<Props> = (props: Props) => {
  const { content } = props

  return (
    <ReactMarkdown
      plugins={[gfm, rui]}
      renderers={{
        code: Code,
        image: Image,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export default BlogBody
