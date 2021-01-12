import React from 'react'
import { Box, Hidden, Typography } from '@material-ui/core'
import { useStaticQuery, graphql } from 'gatsby'
import { HomeQuery } from '../types/generated-gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useThemeContext } from '../context/theme'
import Aside from './Aside'
import { useIsMobile } from '../hooks/'
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks'
import { Link } from 'gatsby-material-ui-components'

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
        <Box component="header" sx={{ position: 'relative', py: 12 }}>
          {darkMode ? (
            <GatsbyImage
              image={getImage(data.darkbg as FileNode)!}
              alt="Golden tree against a gray sky"
              css={{
                position: 'absolute !important' as 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: -1,
                filter: 'brightness(0.6)',
              }}
            />
          ) : (
            <GatsbyImage
              image={getImage(data.lightbg as FileNode)!}
              alt="green grass closeup"
              css={{
                position: 'absolute !important' as 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: -1,
                filter: 'brightness(0.6)',
              }}
            />
          )}
          <Typography
            variant="h1"
            align="center"
            sx={{
              fontWeight: 900,
              color: (theme) => theme.palette.common.white,
              fontSize: (theme) =>
                `calc(${theme.typography.h1.fontSize} * 3) !important`,
            }}
          >
            Sean Paul Campbell
          </Typography>
        </Box>
        {/* <Box sx={{ height: '10vh', width: '100%' }} /> */}
        <Box
          id="about"
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            width: '100%',
            px: 6,
            py: 12,
          }}
          component="article"
        >
          <Box
            sx={{
              width: 'min(85ch, 100%)',
              m: 'auto',
              display: 'flex',
              flexFlow: 'column',
              gap: (theme) => theme.spacing(3),
            }}
          >
            <Typography
              variant="h2"
              sx={{
                borderBottom: `1px solid currentColor`,
              }}
            >
              About
            </Typography>
            <Typography variant="body1" sx={{}}>
              I am a JavaScript / TypeScript Full Stack Developer. While
              completing my electrical apprenticeship I decided to also take on
              the challenge of learning how to code. I settled on JavaScript and
              I could not have been more thrilled with my choice. It has grown
              so much in the last few year and because of that, my journey has
              been a constant learning opportunity. Along with that knowledge
              came an opportunity which I capitalized on by building an entire
              Training Center application called{' '}
              <Link
                color="inherit"
                underline="always"
                href="htts://certground.com"
              >
                CertGround.com
              </Link>
            </Typography>
          </Box>
        </Box>
        <Box
          id="projects"
          sx={{
            width: '100%',
            px: 6,
            py: 4,
          }}
          component="article"
        >
          <Box
            sx={{
              width: 'min(85ch, 100%)',
              m: 'auto',
              display: 'flex',
              flexFlow: 'column',
              gap: (theme) => theme.spacing(3),
            }}
          >
            <Typography
              variant="h2"
              sx={{
                borderBottom: `1px solid currentColor`,
              }}
            >
              Projects
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Home
