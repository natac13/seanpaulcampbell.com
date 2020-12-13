import React from 'react'
import SEO from './SEO'
import Footer from './Footer'
import Navbar from './Narbar'

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = (props: Props) => {
  const { children } = props

  return (
    <>
      <SEO />
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default Layout
