import {
  AppBar,
  Box,
  Fab,
  Toolbar,
  Typography,
  Link as MuiLink,
  experimentalStyled,
  Theme,
  IconButton,
  Hidden,
} from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import React, { useState, useCallback } from 'react'
import HideOnScroll from './HideOnScroll'
import { ScrollTop } from './ScrollTop'
import Link from 'next/link'
import { GitHub, LinkedIn, Menu } from '@material-ui/icons'
import VisuallyHidden from './VisuallyHidden'
import { NavIconLinks, NavLinks } from '../types/nav'
import MobileNav from './MobileNav'

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
                maxWidth: '60%',
                alignItems: 'center',
              }}
            >
              <Typography variant="h4" component="div">
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
        </Fab>
      </ScrollTop>
    </>
  )
}

export default Navbar
