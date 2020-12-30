import { IconButton } from 'gatsby-material-ui-components'
import React, { useContext } from 'react'
import { useTransition, animated, config as rsConfig } from 'react-spring'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import ThemeContext from '../themes/themeContext'
import VisuallyHidden from './VisuallyHidden'
import { Brightness3, WbSunny } from '@material-ui/icons'
import useIsMobile from '../hooks/useIsMobile'

const AnimatedSun = animated(WbSunny)
const AnimatedMoon = animated(Brightness3)

const DarkModeButton: React.FC = () => {
  const isMobile = useIsMobile()
  const { darkMode, setDarkMode } = useContext(ThemeContext)
  const prefersReduceMotion = usePrefersReducedMotion()

  const darkIconTransition = useTransition(darkMode, null, {
    // from: { opacity: 0, position: 'absolute', transform: 'translateX(-20px)' },
    from: { opacity: 1, position: 'absolute' },
    enter: { opacity: 1, transform: 'translateX(0px)' },
    leave: { opacity: 0, transform: 'translateX(20px)' },
    config: rsConfig.stiff,
    immediate: isMobile || prefersReduceMotion,
  })

  return (
    <IconButton
      css={(theme) => ({
        transform: `translateX(-${
          isMobile ? '0' : theme.spacing(2)
        }) rotate(28deg)`,
        color: theme.palette.primary.contrastText,
      })}
      aria-label="change color mode"
      onClick={() => setDarkMode?.(!darkMode)}
    >
      {darkIconTransition.map(({ item, key, props }) =>
        item ? <AnimatedMoon style={props} /> : <AnimatedSun style={props} />
      )}
      <VisuallyHidden>{`Change to ${
        darkMode ? 'light' : 'dark'
      } mode`}</VisuallyHidden>
    </IconButton>
  )
}

export default DarkModeButton
