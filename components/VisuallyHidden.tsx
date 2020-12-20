import { experimentalStyled } from '@material-ui/core'
import React, { useState, useEffect, HTMLAttributes } from 'react'

const StyledSpan = experimentalStyled('span')`
  display: inline-block;
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1;
  width: 1;
  margin: -1;
  padding: 0;
  border: 0;
`

interface Props extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

const VisuallyHidden: React.FC<Props> = ({ children, ...delegated }: Props) => {
  const [forceShow, setForceShow] = useState(false)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === 'Alt') {
          setForceShow(true)
        }
      }

      const handleKeyUp = (ev: KeyboardEvent) => {
        if (ev.key === 'Alt') {
          setForceShow(false)
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('keyup', handleKeyUp)
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
        window.removeEventListener('keydown', handleKeyUp)
      }
    }
  }, [])

  if (forceShow) {
    return <>{children}</>
  }

  return <StyledSpan {...delegated}>{children}</StyledSpan>
}

export default VisuallyHidden
