import React from 'react'
import { Box } from '@material-ui/core'
import DarkModeButton from './DarkModeButton'
import SoundStateButton from './SoundStateButton'
import FontSizeSelect from './FontSizeSelect'

const Preferences: React.FC = () => {
  return (
    <Box
      id="preferences"
      sx={{
        color: 'secondary.main',
        py: 1,
        px: 6,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: (theme) => theme.spacing(2),
      }}
    >
      <DarkModeButton />
      <SoundStateButton />
      <FontSizeSelect />
    </Box>
  )
}

export default Preferences
