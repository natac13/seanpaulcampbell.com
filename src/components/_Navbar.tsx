import {
  AppBar,
  Box,
  experimentalStyled,
  Fab,
  Hidden,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { GitHub, LinkedIn } from '@material-ui/icons'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import React from 'react'
import useIsMobile from '../hooks/useIsMobile'
import { NavIconLinks, NavLinks } from '../types/nav'
import HideOnScroll from './HideOnScroll'
import MobileNav from './_MobileNav'
import { ScrollTop } from './ScrollTop'
import VisuallyHidden from './VisuallyHidden'
import { Link, IconButton } from 'gatsby-material-ui-components'
import DarkModeButton from './DarkModeButton'

interface Props {}

const StyledLink = experimentalStyled(Link)(
  ({ theme }) =>
    `
  color: ${theme.palette.primary.contrastText};
  font-size: ${theme.typography.h6.fontSize};
  font-weight: 600;
  text-transform: uppercase;
`
)

const navLinks: NavLinks = [
  {
    text: 'Blog',
    url: '/blog',
  },
  {
    text: 'Photography',
    url: '/photography',
  },
  {
    text: 'About',
    url: '/about',
  },
]

const navIconLinks: NavIconLinks = [
  {
    url: 'https://github.com/natac13',
    text: 'GitHub Account',
    icon: <GitHub />,
  },
  {
    url: 'https://www.linkedin.com/in/seancampbellnatac/',
    text: 'LinkedIn Account',
    icon: <LinkedIn />,
  },
]

const Navbar: React.FC<Props> = () => {
  const isMobile = useIsMobile()

  return (
    <>
      <HideOnScroll>
        <AppBar position="fixed">
          <Toolbar>
            <Box
              id="navbar-left"
              sx={{
                color: 'primary.contrastText',
                display: 'flex',
                flex: '1 0',
                alignItems: 'center',
                gap: (theme) => theme.spacing(3),
              }}
            >
              <Typography variant={isMobile ? 'h5' : 'h4'} component="div">
                Sean Paul Campbell
              </Typography>
            </Box>

            <Hidden
              css={{
                flex: '2 0',
              }}
              id="navbar-middle"
              implementation="css"
              mdDown
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                {navLinks.map((link) => (
                  <StyledLink
                    activeStyle={{ textDecoration: 'underline' }}
                    partiallyActive
                    key={link.text}
                    to={link.url}
                    underline="none"
                  >
                    {link.text}
                  </StyledLink>
                ))}
              </Box>
            </Hidden>

            <Box
              id="navbar-right"
              sx={{
                flex: '1 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Hidden implementation="css" smUp>
                <MobileNav navIconLinks={navIconLinks} navLinks={navLinks} />
              </Hidden>
              <Hidden implementation="css" smDown>
                <DarkModeButton />
                {navIconLinks.map((link) => (
                  <IconButton
                    key={link.text}
                    onClick={link.onClick}
                    to={link.url || ''}
                    css={(theme) => ({
                      color: theme.palette.primary.contrastText,
                    })}
                  >
                    {link.icon}
                    <VisuallyHidden>{link.text}</VisuallyHidden>
                  </IconButton>
                ))}
              </Hidden>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
          <VisuallyHidden>3Go to page top</VisuallyHidden>
        </Fab>
      </ScrollTop>
    </>
  )
}

export default Navbar
