import { AppBar, Box, Fab, Toolbar } from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import React from 'react'
import HideOnScroll from './HideOnScroll'
import { ScrollTop } from './ScrollTop'

interface Props {}

const Navbar: React.FC<Props> = (props: Props) => {
  return (
    <>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <Box></Box>
            <Box></Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  )
}

export default Navbar
