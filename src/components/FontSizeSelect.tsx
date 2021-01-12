import { Button, IconButton } from 'gatsby-material-ui-components'
import React, { useCallback, useRef, useState } from 'react'
import VisuallyHidden from './VisuallyHidden'
import { useFontSizeContext } from '../context/fontSize'
import { TextFields } from '@material-ui/icons'
import { Box, Popover, Typography } from '@material-ui/core'
import { useFontFamilyContext } from '../context/fontFamily'
import useEventListener from '@use-it/event-listener'
import soundOpen from '../../content/sounds/open.wav'
import soundClose from '../../content/sounds/close.wav'
import { useSoundContext } from '../context/sound'
import useSound from 'use-sound'
import { VOLUME_DEFAULT } from '../constants'

const fontSizes = [
  { id: 'Small', value: 12 },
  { id: 'Default', value: 16 },
  { id: 'Large', value: 20 },
  { id: 'X-Large', value: 24 },
]

const fontFamilies = [
  { id: 'Classic', value: 'serif' },
  { id: 'Default', value: 'sans-serif' },
]

const FontSizeSelect: React.FC = () => {
  const { setFontSize, fontSize } = useFontSizeContext()
  const { soundOn } = useSoundContext()
  const { fontFamily, setFontFamily } = useFontFamilyContext()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const menuRef = useRef<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const [playOpen] = useSound(soundOpen, { volume: 0.5, soundEnabled: soundOn })
  const [playClose] = useSound(soundClose, {
    volume: VOLUME_DEFAULT,
    soundEnabled: soundOn,
  })

  const toggleFontFamily = useCallback(() => {
    if (fontFamily === 'sans-serif') {
      setFontFamily('serif')
    } else {
      setFontFamily('sans-serif')
    }
  }, [setFontFamily, fontFamily])

  const toggleMenu = useCallback(() => {
    if (open) {
      playClose()
      setAnchorEl(null)
    } else {
      playOpen()
      setAnchorEl(menuRef.current)
    }
  }, [menuRef, setAnchorEl, open, playOpen, playClose])

  useEventListener('keydown', (ev: KeyboardEvent) => {
    if (ev.ctrlKey && ev.keyCode === 85) {
      ev?.preventDefault()
      toggleMenu()
    }
  })

  return (
    <>
      <IconButton
        aria-haspopup="true"
        aria-label="open change font menu"
        onClick={toggleMenu}
        ref={menuRef}
      >
        <TextFields />
        <VisuallyHidden>Change Font</VisuallyHidden>
      </IconButton>
      <Popover
        id="font-select-menu"
        anchorEl={anchorEl}
        keepMounted
        elevation={9}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorEl)}
        onClose={toggleMenu}
      >
        <Typography variant="h6" align="center">
          Font Family
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(2, 1fr)`,
            width: '23rem',
            gap: (theme) => theme.spacing(3),
            p: 3,
          }}
        >
          {fontFamilies.map((ff) => (
            <Button
              key={ff.id}
              onClick={() => setFontFamily(ff.value)}
              variant={ff.value === fontFamily ? 'contained' : 'outlined'}
            >
              {ff.id}
            </Button>
          ))}
        </Box>
        <Typography variant="h6" align="center">
          Font Size
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(2, 1fr)`,
            width: '23rem',
            gap: (theme) => theme.spacing(3),
            p: 3,
          }}
        >
          {fontSizes.map((fs, idx) => (
            <Button
              key={fs.id}
              variant={fs.value === fontSize ? 'contained' : 'outlined'}
              onClick={() => {
                if (fs.value !== fontSize) {
                  setFontSize(fs.value)
                }
              }}
            >
              {`${fs.id}`}
            </Button>
          ))}
        </Box>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          gutterBottom
        >
          Toggle: (Ctrl + U)
        </Typography>
      </Popover>
    </>
  )
}

export default FontSizeSelect
