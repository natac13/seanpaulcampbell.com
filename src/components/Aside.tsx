import { Box, Typography, alpha } from '@material-ui/core'
import React from 'react'
import Preferences from './Preferences'
import { Link } from 'gatsby-material-ui-components'
import { animated, config as rsConfig, useSpring } from 'react-spring'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import NavContact from './NavContact'
import { useIsMobile, usePrefersReducedMotion, useSiteMetadata } from '../hooks'
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks'

interface Props {
  type: 'mobile' | 'desktop'
}

const Aside: React.FC<Props> = (props: Props) => {
  const { site, meAvatar } = useSiteMetadata()
  const { type } = props
  const prefersReducedMotion = usePrefersReducedMotion()
  const avatarData = getImage(meAvatar as FileNode)

  const isMobile = useIsMobile()

  const summarySpring = useSpring({
    transform: 'scale(1)',
    opacity: 1,
    from: {
      transform: 'scale(0)',
      opacity: 0,
    },
    delay: 500,
    immediate: isMobile || prefersReducedMotion,
  })

  const nameSpring = useSpring({
    transform: 'translateX(0)',
    from: {
      transform: 'translateX(-400px)',
    },
    config: rsConfig.stiff,
    immediate: isMobile || prefersReducedMotion,
  })

  return (
    <Box
      component="aside"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: type === 'mobile' ? '100%' : '25%',
        height: '100vh',
        bgcolor: (theme) => alpha(theme.palette.background.paper, 0.83),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: (theme) => theme.zIndex.drawer,
      }}
    >
      <Preferences />
      <Box
        id="me-card"
        sx={{
          my: 3,
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: (theme) => theme.spacing(2),
        }}
      >
        <Link to="/" underline="none">
          <GatsbyImage
            css={(theme) => ({
              borderRadius: '50%',
              boxShadow: theme.shadows[3],
            })}
            alt="Sean Campbell head shot"
            image={avatarData!}
          />
        </Link>
        <Box>
          <animated.div style={nameSpring}>
            <Typography
              variant="h1"
              sx={{
                fontSize: (theme) =>
                  `${theme.typography.h3.fontSize} !important`,
              }}
              align="center"
              color="primary"
            >
              {site?.siteMetadata?.author?.name}
            </Typography>
          </animated.div>
          <animated.div style={summarySpring}>
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{
                m: 'auto',
                textAlign: 'center',
              }}
            >
              {site?.siteMetadata?.author?.summary}
            </Typography>
          </animated.div>
        </Box>
      </Box>
      <Box id="main-nav" component="nav"></Box>
      <NavContact type="desktop" />
    </Box>
  )
}

export default Aside
