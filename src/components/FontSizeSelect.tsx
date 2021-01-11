import { Button, IconButton } from 'gatsby-material-ui-components'
import React, { useCallback, useRef, useState } from 'react'
import VisuallyHidden from './VisuallyHidden'
import { useFontSizeContext } from '../context/fontSize'
import { TextFields } from '@material-ui/icons'
import {
  Box,
  ButtonProps,
  experimentalStyled,
  Menu,
  MenuItem,
  Popover,
  Typography,
} from '@material-ui/core'
import { useFontFamilyContext } from '../context/fontFamily'
import useEventListener from '@use-it/event-listener'
import soundOpen from '../../content/sounds/open.wav'
import soundClose from '../../content/sounds/close.wav'
import { useSoundContext } from '../context/sound'
import useSound from 'use-sound'

const StyledButton = experimentalStyled(Button)<
  ButtonProps & { active: boolean }
>(({ theme, active }) => ({
  // border: '3px',
  // borderColor: active
  //   ? theme.palette.primary.main
  //   : theme.palette.text.secondary,
  // borderStyle: 'dashed',
  // borderRadius: '6px',
}))

const fontSizes = [14, 16, 18, 20, 22, 24]

const FontSizeSelect: React.FC = () => {
  const { setFontSize, fontSize } = useFontSizeContext()
  const { soundOn } = useSoundContext()
  const { fontFamily, setFontFamily } = useFontFamilyContext()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const menuRef = useRef<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const [playOpen] = useSound(soundOpen, { volume: 0.5, soundEnabled: soundOn })
  const [playClose] = useSound(soundClose, {
    volume: 0.5,
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
          <Button
            onClick={() => setFontFamily('serif')}
            variant={fontFamily === 'serif' ? 'contained' : 'outlined'}
          >
            Serif
          </Button>
          <Button
            onClick={() => setFontFamily('sans-serif')}
            variant={fontFamily === 'sans-serif' ? 'contained' : 'outlined'}
          >
            Sans-Serif
          </Button>
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
              key={idx}
              variant={fs === fontSize ? 'contained' : 'outlined'}
              onClick={() => {
                if (fs !== fontSize) {
                  setFontSize(fs)
                }
              }}
            >
              {`${fs} px`}
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
