import { IconButton } from 'gatsby-material-ui-components'
import React, { useCallback } from 'react'
import VisuallyHidden from './VisuallyHidden'
import { VolumeOff, VolumeUp } from '@material-ui/icons'
import { useSoundContext } from '../context/sound'
import soundOnWav from '../../content/sounds/soundOn.wav'
import soundOffWav from '../../content/sounds/soundOff.wav'
import useSound from 'use-sound'
import useEventListener from '@use-it/event-listener'

const SoundStateButton: React.FC = () => {
  const { soundOn, setSoundOn } = useSoundContext()
  const [playSoundOn] = useSound(soundOnWav, { volume: 0.5 })
  const [playSoundOff] = useSound(soundOffWav, { volume: 0.5 })

  const toggleSound = useCallback(() => {
    if (soundOn) {
      // playSoundOff()
      setSoundOn(false)
    } else {
      playSoundOn()
      setSoundOn(true)
    }
  }, [soundOn, playSoundOn, playSoundOff, setSoundOn])

  useEventListener('keydown', (ev: KeyboardEvent) => {
    if (ev.ctrlKey && ev.keyCode === 83) {
      ev?.preventDefault()
      toggleSound()
    }
  })

  return (
    <IconButton aria-label="toggle sound on or off" onClick={toggleSound}>
      {soundOn ? <VolumeUp /> : <VolumeOff />}
      <VisuallyHidden>{`Turn sound ${soundOn ? 'off' : 'on'}`}</VisuallyHidden>
    </IconButton>
  )
}

export default SoundStateButton
