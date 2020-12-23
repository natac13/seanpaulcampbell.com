import React from 'react'
import NextLink from 'next/link'
import { Link } from '@material-ui/core'

interface Props {
  href: string
  children: string
}

const BlogLink: React.FC<Props> = ({ href, children, ...rest }: Props) => {
  return (
    <NextLink href={href} passHref>
      <Link
        css={(theme) => ({
          color: theme.palette.primary.main,
          ':visited': {
            color: theme.palette.primary.main,
          },
        })}
        {...rest}
      >
        {children}
      </Link>
    </NextLink>
  )
}

export default BlogLink
