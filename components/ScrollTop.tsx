import { Box, useScrollTrigger, Zoom } from '@material-ui/core'
import React, { useCallback } from 'react'

interface Props {
  children: React.ReactElement
}

export const ScrollTop: React.FC<Props> = (props: Props) => {
  const { children } = props

  const trigger = useScrollTrigger({
    threshold: 100,
    disableHysteresis: true,
  })

  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor')
    anchor?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }, [])

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: 'fixed',
          bottom: (theme) => theme.spacing(3),
          right: (theme) => theme.spacing(3),
        }}
      >
        {children}
      </Box>
    </Zoom>
  )
}
