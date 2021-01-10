import { IconButton } from 'gatsby-material-ui-components'
import React, { useCallback } from 'react'
import { useTransition, animated, config as rsConfig } from 'react-spring'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import VisuallyHidden from './VisuallyHidden'
import { NightsStay, WbSunny } from '@material-ui/icons'
import useIsMobile from '../hooks/useIsMobile'
import { useThemeContext } from '../context/theme'
import useSound from 'use-sound'
import daySound from '../../content/sounds/sun.wav'
import nightSound from '../../content/sounds/night.wav'
import { useSoundContext } from '../context/sound'

const AnimatedSun = animated(WbSunny)
const AnimatedMoon = animated(NightsStay)

const DarkModeButton: React.FC = () => {
  const isMobile = useIsMobile()
  const { soundOn } = useSoundContext()
  const soundConfig = { volume: 0.5, soundEnabled: soundOn }
  const { darkMode, setDarkMode } = useThemeContext()
  const prefersReduceMotion = usePrefersReducedMotion()
  const [playDay] = useSound(daySound, soundConfig)
  const [playNight] = useSound(nightSound, soundConfig)

  const darkIconTransition = useTransition(darkMode, null, {
    // from: { opacity: 0, position: 'absolute', transform: 'translateX(-20px)' },
    from: { opacity: 1, position: 'absolute' },
    enter: { opacity: 1, transform: 'translate(0px, 0px)' },
    leave: { opacity: 0, transform: 'translate(-40px, 40px)' },
    config: rsConfig.stiff,
    immediate: isMobile || prefersReduceMotion,
  })

  const toggleDarkMode = useCallback(() => {
    if (darkMode) {
      playDay()
      setDarkMode(false)
    } else {
      playNight()
      setDarkMode(true)
    }
  }, [setDarkMode, playNight, playDay, darkMode])

  return (
    <IconButton
      css={(theme) => ({
        // transform: `rotate(28deg)`,
        color: 'inherit',
        paddingRight: theme.spacing(2),
      })}
      aria-label="change color mode"
      onClick={toggleDarkMode}
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
