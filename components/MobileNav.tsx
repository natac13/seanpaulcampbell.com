import {
  Dialog,
  Fade,
  IconButton,
  Link as MuiLink,
  makeStyles,
} from '@material-ui/core'
import Link from 'next/link'
import { TransitionProps } from '@material-ui/core/transitions'
import React, { useState, useCallback } from 'react'
import { animated, useTrail, config as rsConfig } from 'react-spring'
import { NavIconLinks, NavLinks } from '../types/nav'
import { Close } from '@material-ui/icons'

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>
  ) => <Fade ref={ref} {...props} />
)

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'grid',
    placeItems: 'center center',
    height: '100%',
    width: '100%',
  },
  links: {
    display: 'grid',
    gridGap: theme.spacing(2),
  },
}))

interface Props {
  navLinks: NavLinks
  navIconLinks: NavIconLinks
  open: boolean
  handleClose: () => void
}

const AnimatedDiv = animated.div

const MobileNav: React.FC<Props> = (props: Props) => {
  const classes = useStyles()
  const { handleClose, open, navLinks, navIconLinks } = props

  const trail = useTrail(navLinks.length, {
    opacity: 1,
    transform: 'translateY(0) scale(1)',
    from: {
      opacity: 0,
      transform: 'translateY(-23px) scale(0.6)',
    },
    config: rsConfig.gentle,
    reset: true,
  })

  const DisplayLinks = trail.map(({ opacity, transform }, idx) => {
    const navLink = navLinks[idx]
    return (
      <AnimatedDiv key={navLink.text} style={{ transform, opacity }}>
        <Link href={navLink.url} passHref>
          <MuiLink variant="h4" underline="none">
            {navLink.text}
          </MuiLink>
        </Link>
      </AnimatedDiv>
    )
  })

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <IconButton onClick={handleClose}>
        <Close />
      </IconButton>
      <section className={classes.wrapper}>
        <div className={classes.links}>{DisplayLinks}</div>
        <div className={classes.iconLinks}></div>
      </section>
    </Dialog>
  )
}

export default MobileNav
