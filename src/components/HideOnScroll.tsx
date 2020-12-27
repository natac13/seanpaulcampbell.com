import { Slide, useScrollTrigger } from '@material-ui/core'
import React from 'react'

interface Props {
  children: React.ReactElement
}

const HideOnScroll: React.FC<Props> = (props: Props) => {
  const { children } = props

  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

export default HideOnScroll
