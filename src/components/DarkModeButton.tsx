import { IconButton } from 'gatsby-material-ui-components'
import React from 'react'
import { useTransition, animated, config as rsConfig } from 'react-spring'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import VisuallyHidden from './VisuallyHidden'
import { NightsStay, WbSunny } from '@material-ui/icons'
import useIsMobile from '../hooks/useIsMobile'
import { useThemeContext } from '../context/theme'

const AnimatedSun = animated(WbSunny)
const AnimatedMoon = animated(NightsStay)

const DarkModeButton: React.FC = () => {
  const isMobile = useIsMobile()
  const { darkMode, setDarkMode } = useThemeContext()
  const prefersReduceMotion = usePrefersReducedMotion()

  const darkIconTransition = useTransition(darkMode, null, {
    // from: { opacity: 0, position: 'absolute', transform: 'translateX(-20px)' },
    from: { opacity: 1, position: 'absolute' },
    enter: { opacity: 1, transform: 'translate(0px, 0px)' },
    leave: { opacity: 0, transform: 'translate(-40px, 40px)' },
    config: rsConfig.stiff,
    immediate: isMobile || prefersReduceMotion,
  })

  return (
    <IconButton
      css={(theme) => ({
        // transform: `rotate(28deg)`,
        color: 'inherit',
        paddingRight: theme.spacing(2),
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
