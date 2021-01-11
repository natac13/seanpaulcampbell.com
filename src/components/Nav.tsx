import {
  AppBar,
  Box,
  SwipeableDrawer,
  Toolbar,
  Typography,
  useTheme,
} from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import { IconButton, Link } from 'gatsby-material-ui-components'
import React, { useCallback, useState } from 'react'
import { useIsMobile, useSiteMetadata } from '../hooks/'
import Aside from './Aside'

const Nav: React.FC = () => {
  const { site } = useSiteMetadata()
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
            <Aside type="mobile" />
          </SwipeableDrawer>
        </>
      ) : null}
    </>
  )
}

export default Nav
