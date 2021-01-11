import React from 'react'
import { Box, Hidden } from '@material-ui/core'
import { useStaticQuery, graphql } from 'gatsby'
import { HomeQuery } from '../types/generated-gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useThemeContext } from '../context/theme'
import Aside from './Aside'
import { useIsMobile } from '../hooks/'
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks'

const Home: React.FC = () => {
  const { darkMode } = useThemeContext()
  const isMobile = useIsMobile()
  const data: HomeQuery = useStaticQuery(graphql`
    query Home {
      darkbg: file(relativePath: { eq: "images/home-dark.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FLUID, maxWidth: 1600, quality: 60)
        }
      }
      lightbg: file(relativePath: { eq: "images/grass.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FLUID, maxWidth: 1600, quality: 60)
        }
      }
    }
  `)

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
      }}
    >
      <Hidden mdDown>
        <Aside type="desktop" />
      </Hidden>
      <Box
        sx={{
          width: isMobile ? '100%' : '75%',
          marginLeft: isMobile ? '0' : '25%',
        }}
      >
        {darkMode ? (
          <GatsbyImage
            image={getImage(data.darkbg as FileNode)!}
            alt="Golden tree against a gray sky"
          />
        ) : (
          <GatsbyImage
            image={getImage(data.lightbg as FileNode)!}
            alt="green grass closeup"
          />
        )}
      </Box>
    </Box>
  )
}

export default Home
