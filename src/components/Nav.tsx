import {
  AppBar,
  Box,
  Divider,
  fade,
  SwipeableDrawer,
  Toolbar,
  Typography,
  useTheme,
} from '@material-ui/core'
import {
  Email,
  GitHub,
  LinkedIn,
  Menu as MenuIcon,
  Twitter,
} from '@material-ui/icons'
import { IconButton, Link } from 'gatsby-material-ui-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks'
import React, { useCallback, useState } from 'react'
import { animated, config as rsConfig, useSpring } from 'react-spring'
import useIsMobile from '../hooks/useIsMobile'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import useSiteMetadata from '../hooks/useSiteMetadata'
import DarkModeButton from './DarkModeButton'
import FontSizeSelect from './FontSizeSelect'
import NavContact from './NavContact'
import Preferences from './Preferences'
import SoundStateButton from './SoundStateButton'

interface Props {
  children: React.ReactNode
}

const Nav: React.FC<Props> = (props: Props) => {
  const { site, meAvatar } = useSiteMetadata()
  const prefersReducedMotion = usePrefersReducedMotion()
  const avatarData = getImage(meAvatar as FileNode)
  const [open, setOpen] = useState(false)
  const handleOpenMenu = useCallback(() => {
    setOpen(true)
  }, [setOpen])
  const handleCloseMenu = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const isMobile = useIsMobile()
  const theme = useTheme()

  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)

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
    <>
      {isMobile ? (
        <>
          <AppBar position="fixed" color="default">
            <Toolbar css={{ display: 'flex' }}>
              <Box sx={{ flex: '0 1' }}>
                <IconButton
                  aria-label="open menu"
                  onClick={handleOpenMenu}
                  edge="start"
                >
                  <MenuIcon color="primary" />
                </IconButton>
              </Box>
              <Link
                css={{
                  flex: '1 0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                to="/"
                underline="none"
              >
                <Typography
                  css={(theme) => ({
                    fontSize: theme.typography.h4.fontSize,
                  })}
                  color="primary"
                >
                  {site?.siteMetadata?.author?.name}
                </Typography>
                <Typography
                  sx={{
                    m: 'auto',
                    textAlign: 'center',
                    fontFamily: (theme) => theme.typography.h2.fontFamily,
                  }}
                  variant="body1"
                  color="textSecondary"
                  align="center"
                >
                  {site?.siteMetadata?.author?.summary}
                </Typography>
              </Link>
            </Toolbar>
          </AppBar>
          <SwipeableDrawer
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={open}
            onClose={handleCloseMenu}
            onOpen={handleOpenMenu}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
          >
            <Box sx={{ height: '60vh', width: '80vw' }}>
              <Preferences />
              <NavContact type="mobile" />
            </Box>
          </SwipeableDrawer>
        </>
      ) : (
        <Box
          component="aside"
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            width: '28%',
            height: '100vh',
            bgcolor: (theme) => fade(theme.palette.primary.main, 0.13),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
      )}
    </>
  )
}

export default Nav
