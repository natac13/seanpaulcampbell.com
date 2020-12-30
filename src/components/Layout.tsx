import React from 'react'
import SEO from './SEO'
import Footer from './Footer'
import Navbar from './Navbar'
import { experimentalStyled as styled } from '@material-ui/core'

interface Props {
  children?: React.ReactNode
}

const Wrapper = styled('section')(
  () => `
  display: grid;
  grid-template-columns: 1fr min(83ch, calc(100% - 64px)) 1fr;
  grid-column-gap: 32px;
  & > * {
    grid-column: 2;
  }
  `
)

const Layout: React.FC<Props> = (props: Props) => {
  const { children } = props

  return (
    <>
      <SEO />
      <Navbar />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </>
  )
}

export default Layout
