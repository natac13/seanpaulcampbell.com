import React from 'react'
import { Box, Link as MuiLink, Typography } from '@material-ui/core'
import siteConfig from '../site-config'

export default function Copyright() {
  return (
    <Box>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <MuiLink color="inherit" href={siteConfig.url}>
          {siteConfig.author}
        </MuiLink>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  )
}
