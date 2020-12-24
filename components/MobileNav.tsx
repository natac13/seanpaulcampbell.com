import {
  Box,
  Dialog,
  Fade,
  Hidden,
  IconButton,
  Link as MuiLink,
  Typography,
} from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'
import { Close } from '@material-ui/icons'
import Menu from '@material-ui/icons/Menu'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { config as rsConfig, useTrail } from 'react-spring'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import { NavIconLinks, NavLinks } from '../types/nav'
import AnimatedBox from './AnimatedBox'
import VisuallyHidden from './VisuallyHidden'

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>
  ) => <Fade ref={ref} {...props} />
)

interface Props {
  navLinks: NavLinks
  navIconLinks: NavIconLinks
}

const MobileNav: React.FC<Props> = (props: Props) => {
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
      transform: 'translateY(-60px) scale(0.6)',
    },
    config: rsConfig.stiff,
    reset: !prefersReduceMotion,
    immediate: prefersReduceMotion,
  })

  const iconTrail = useTrail(navIconLinks.length, {
    opacity: 1,
    transform: 'translateX(0) rotate(0deg)',
    from: {
      opacity: 0,
      transform: `translateX(-60px) rotate(60deg)`,
    },
    config: rsConfig.stiff,
    reset: !prefersReduceMotion,
    immediate: prefersReduceMotion,
  })

  const DisplayLinks = trail.map((props, idx) => {
    const navLink = navLinks[idx]
    return (
      <AnimatedBox key={navLink.text} style={props}>
        <Link href={navLink.url} passHref>
          <MuiLink variant="h4" underline="none">
            {navLink.text}
          </MuiLink>
        </Link>
      </AnimatedBox>
    )
  })

  const DisplayIconLinks = iconTrail.map((props, idx) => {
    const iconLink = navIconLinks[idx]
    return (
      <AnimatedBox
        key={iconLink.text}
        style={props}
        sx={{
          display: 'inline-block',
        }}
      >
        <IconButton href={iconLink.url || ''} onClick={iconLink.onClick}>
          {iconLink.icon}
          <VisuallyHidden>{iconLink.text}</VisuallyHidden>
        </IconButton>
      </AnimatedBox>
    )
  })

  return (
    <>
      <Hidden smUp>
        <Box
          component={IconButton}
          onClick={handleOpen}
          sx={{
            zIndex: (theme) => theme.zIndex.appBar + 1,
          }}
        >
          <Menu />
          <VisuallyHidden>Open Menu</VisuallyHidden>
        </Box>
      </Hidden>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Box component={IconButton} sx={{}} onClick={handleClose}>
          <Close />
        </Box>
        <Box
          component="section"
          sx={{
            display: 'grid',
            gridTemplateRows: '1fr min-content',
            placeItems: 'center center',
            height: '85vh',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gap: (theme) => theme.spacing(2),
            }}
          >
            {DisplayLinks}
          </Box>
          <Box
            sx={{
              placeSelf: 'end start',
              ml: 4,
            }}
          >
            {DisplayIconLinks}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            placeItems: 'center center',
            height: '100%',
            color: 'text.secondary',
          }}
        >
          <Typography variant="h6" component="p" color="inherit">
            Sean Paul Campbell
          </Typography>
        </Box>
      </Dialog>
    </>
  )
}

export default MobileNav