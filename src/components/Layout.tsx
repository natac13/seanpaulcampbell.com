import React from 'react'
import SEO from './SEO'
import Footer from './Footer'
import Navbar from './Navbar'
import {
  AppBar,
  Box,
  experimentalStyled as styled,
  Toolbar,
} from '@material-ui/core'
import Nav from '../components/Nav'

interface Props {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = (props: Props) => {
  const { children } = props
  const handleOpenMenu = () => {}

  return (
    <>
      <SEO />
      <Nav />
      <Box
        component="main"
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(10, 1fr)`,
        }}
      >
        {children}
      </Box>
      <Footer />
    </>
  )
}

export default Layout
