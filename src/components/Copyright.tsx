import React from 'react'
import { Box, Typography } from '@material-ui/core'

export default function Copyright() {
  return (
    <Box>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        {/* <MuiLink color="inherit" href={siteConfig.url}> */}
        {/*   {siteConfig.author} */}
        {/* </MuiLink>{' '} */}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  )
}
