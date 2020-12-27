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
import MobileNav from './MobileNav'
import { ScrollTop } from './ScrollTop'
import VisuallyHidden from './VisuallyHidden'
import { Link, IconButton } from 'gatsby-material-ui-components'

interface Props {}

const StyledLink = experimentalStyled(Link)(
  ({ theme }) => `
color: ${theme.palette.primary.contrastText};
font-size: ${theme.typography.h5.fontSize};
margin-left: ${theme.spacing(3)};
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
              }}
            >
              <Typography variant={isMobile ? 'h5' : 'h4'} component="div">
                Sean Paul Campbell
              </Typography>
              <Hidden implementation="css" mdDown>
                {navLinks.map((link) => (
                  <StyledLink key={link.text} to={link.url}>
                    {link.text}
                  </StyledLink>
                ))}
              </Hidden>
            </Box>
            <Box id="navbar-right">
              <Hidden implementation="css" smUp>
                <MobileNav navIconLinks={navIconLinks} navLinks={navLinks} />
              </Hidden>
              <Hidden implementation="css" mdDown>
                {navIconLinks.map((link) => (
                  <IconButton
                    key={link.text}
                    onClick={link.onClick}
                    to={link.url || ''}
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
