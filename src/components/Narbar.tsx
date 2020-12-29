import {
  AppBar,
  Box,
  experimentalStyled,
  Fab,
  Hidden,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { Brightness3, GitHub, LinkedIn, WbSunny } from '@material-ui/icons'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import React, { useContext } from 'react'
import useIsMobile from '../hooks/useIsMobile'
import { NavIconLinks, NavLinks } from '../types/nav'
import HideOnScroll from './HideOnScroll'
import MobileNav from './MobileNav'
import { ScrollTop } from './ScrollTop'
import VisuallyHidden from './VisuallyHidden'
import { Link, IconButton } from 'gatsby-material-ui-components'
import ThemeContext from '../themes/themeContext'
import { useTheme } from '@emotion/react'
import { useTransition, animated, config as rsConfig } from 'react-spring'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

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

const AnimatedSun = animated(WbSunny)
const AnimatedMoon = animated(Brightness3)

const Navbar: React.FC<Props> = () => {
  const isMobile = useIsMobile()
  const { darkMode, setDarkMode } = useContext(ThemeContext)
  const theme = useTheme()
  const prefersReduceMotion = usePrefersReducedMotion()

  const darkIconTransition = useTransition(darkMode, null, {
    from: { opacity: 0, position: 'absolute', transform: 'translateX(-20px)' },
    enter: { opacity: 1, transform: 'translateX(0px)' },
    leave: { opacity: 0, transform: 'translateX(20px)' },
    config: rsConfig.stiff,
    immediate: prefersReduceMotion,
  })

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
              <Hidden implementation="css" smDown>
                <>
                  <IconButton
                    css={(theme) => ({
                      transform: `translateX(-${theme.spacing(2)})`,
                    })}
                    aria-label="change color mode"
                    onClick={() => setDarkMode?.(!darkMode)}
                  >
                    {darkIconTransition.map(({ item, key, props }) =>
                      item ? (
                        <AnimatedMoon style={props} />
                      ) : (
                        <AnimatedSun style={props} />
                      )
                    )}
                    <VisuallyHidden>{`Change to ${
                      darkMode ? 'light' : 'dark'
                    } mode`}</VisuallyHidden>
                  </IconButton>
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
                </>
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
