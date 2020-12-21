import {
  Dialog,
  Fade,
  IconButton,
  Link as MuiLink,
  makeStyles,
  Hidden,
} from '@material-ui/core'
import Menu from '@material-ui/icons/Menu'
import Link from 'next/link'
import { TransitionProps } from '@material-ui/core/transitions'
import React, { useState, useCallback } from 'react'
import { animated, useTrail, config as rsConfig } from 'react-spring'
import { NavIconLinks, NavLinks } from '../types/nav'
import { Close } from '@material-ui/icons'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import VisuallyHidden from './VisuallyHidden'

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>
  ) => <Fade ref={ref} {...props} />
)

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'grid',
    gridTemplateRows: '1fr min-content',
    placeItems: 'center center',
    height: '85vh',
    width: '100%',
  },
  menuBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: theme.zIndex.appBar + 1,
  },
  iconLinks: {
    placeSelf: 'end start',
    marginLeft: theme.spacing(4),
  },
  links: {
    display: 'grid',
    gridGap: theme.spacing(2),
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    // left: '50%',
    // transform: 'translateX(-50%)',
  },
}))

interface Props {
  navLinks: NavLinks
  navIconLinks: NavIconLinks
}

const MobileNav: React.FC<Props> = (props: Props) => {
  const classes = useStyles()
  const prefersReduceMotion = usePrefersReducedMotion()
  const { navLinks, navIconLinks } = props
  const [open, setOpen] = useState(false)
  const handleClose = useCallback(() => setOpen(false), [setOpen])
  const handleOpen = useCallback(() => setOpen(true), [setOpen])

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

  const iconTrail = useTrail(navIconLinks.length, {
    opacity: 1,
    from: {
      opacity: 0,
    },
    config: rsConfig.default,
    reset: true,
  })

  const DisplayLinks = trail.map((props, idx) => {
    const navLink = navLinks[idx]
    return (
      <animated.div key={navLink.text} style={prefersReduceMotion ? {} : props}>
        <Link href={navLink.url} passHref>
          <MuiLink variant="h4" underline="none">
            {navLink.text}
          </MuiLink>
        </Link>
      </animated.div>
    )
  })

  const DisplayIconLinks = iconTrail.map((props, idx) => {
    const iconLink = navIconLinks[idx]
    return (
      <animated.span key={iconLink.text}>
        <IconButton href={iconLink.url || ''} onClick={iconLink.onClick}>
          {iconLink.icon}
          <VisuallyHidden>{iconLink.text}</VisuallyHidden>
        </IconButton>
      </animated.span>
    )
  })

  return (
    <>
      <Hidden smUp>
        <IconButton onClick={handleOpen} className={classes.menuBtn}>
          <Menu />
          <VisuallyHidden>Open Menu</VisuallyHidden>
        </IconButton>
      </Hidden>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <IconButton className={classes.close} onClick={handleClose}>
          <Close />
        </IconButton>
        <section className={classes.wrapper}>
          <div className={classes.links}>{DisplayLinks}</div>
          <div className={classes.iconLinks}>{DisplayIconLinks}</div>
        </section>
      </Dialog>
    </>
  )
}

export default MobileNav
