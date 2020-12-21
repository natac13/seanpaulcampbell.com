import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import React from 'react'
import { dracula as style } from 'react-syntax-highlighter/dist/cjs/styles/prism'
// import { vscDarkPlus as style } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface Props {
  language: string
  value: string
}

const Code: React.FC<Props> = ({ language, value }: Props) => {
  return (
    <SyntaxHighlighter
      showLineNumbers
      language={language || 'javascript'}
      style={style}
    >
      {value}
    </SyntaxHighlighter>
  )
}

export default Code
