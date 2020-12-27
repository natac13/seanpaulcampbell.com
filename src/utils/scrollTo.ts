import React from 'react'

const scrollToRef = (ref: React.MutableRefObject<HTMLElement | null>): void => {
  return ref?.current?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

export default scrollToRef
