import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

interface Props {
  content: string
}

export const PostBody: React.FC<Props> = (props: Props) => {
  const { content } = props

  return <ReactMarkdown plugins={[gfm]} children={content} />
}
