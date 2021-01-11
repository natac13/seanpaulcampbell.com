import { Box } from '@material-ui/core'
import React from 'react'
import Nav from '../components/Nav'
import Footer from './Footer'
import SEO from './SEO'

interface Props {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = (props: Props) => {
  const { children } = props

  return (
    <>
      <SEO />
      <Nav />
      <Box>
        <Box component="main">{children}</Box>
      </Box>
      <Footer />
    </>
  )
}

export default Layout
