import {
  AppBar,
  Box,
  experimentalStyled,
  Fab,
  Hidden,
  IconButton,
  Link as MuiLink,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { GitHub, LinkedIn } from '@material-ui/icons'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Link from 'next/link'
import React from 'react'
import useIsMobile from '../hooks/useIsMobile'
import { NavIconLinks, NavLinks } from '../types/nav'
import HideOnScroll from './HideOnScroll'
import MobileNav from './MobileNav'
import { ScrollTop } from './ScrollTop'
import VisuallyHidden from './VisuallyHidden'

interface Props {}

const StyledLink = experimentalStyled(MuiLink)(
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

const Navbar: React.FC<Props> = (props: Props) => {
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
              <Hidden mdDown>
                {navLinks.map((link) => (
                  <Link key={link.text} href={link.url} passHref>
                    <StyledLink>{link.text}</StyledLink>
                  </Link>
                ))}
              </Hidden>
            </Box>
            <Box id="navbar-right">
              <Hidden smUp>
                <MobileNav navIconLinks={navIconLinks} navLinks={navLinks} />
              </Hidden>
              <Hidden mdDown>
                {navIconLinks.map((link) => (
                  <IconButton
                    key={link.text}
                    onClick={link.onClick}
                    href={link.url || ''}
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
