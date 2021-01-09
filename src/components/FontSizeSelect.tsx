import { Button, IconButton } from 'gatsby-material-ui-components'
import React, { useState } from 'react'
import VisuallyHidden from './VisuallyHidden'
import { useFontSizeContext } from '../context/fontSize'
import { TextFields } from '@material-ui/icons'
import { Box, Menu, MenuItem, Popover, Typography } from '@material-ui/core'

const fontSizes = [12, 16, 20, 24]

const FontSizeSelect: React.FC = () => {
  const { setFontSize, fontSize } = useFontSizeContext()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        aria-haspopup="true"
        aria-label="open change font size menu"
        onClick={handleOpen}
      >
        <TextFields />
        <VisuallyHidden>Change Font Size</VisuallyHidden>
      </IconButton>
      <Popover
        id="font-size-select-menu"
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
        onClose={handleClose}
      >
        <Typography variant="h5" align="center">
          Select Font Size
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(2, 1fr)`,
            width: '20rem',
            height: '20rem',
            gap: (theme) => theme.spacing(3),
            p: 3,
          }}
        >
          {fontSizes.map((fs, idx) => (
            <Button
              key={idx}
              css={(theme) => ({
                border: '3px',
                borderColor:
                  fs === fontSize
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                borderStyle: 'dashed',
                borderRadius: '6px',
              })}
              onClick={() => {
                handleClose()
                if (fs !== fontSize) {
                  setFontSize(fs)
                }
              }}
            >
              {`${fs} px`}
            </Button>
          ))}
        </Box>
      </Popover>
    </>
  )
}

export default FontSizeSelect
