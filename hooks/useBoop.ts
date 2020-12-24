import { useState, useEffect, useCallback, CSSProperties } from 'react'
import { AnimatedValue, SpringConfig, useSpring } from 'react-spring'
import usePrefersReducedMotion from './usePrefersReducedMotion'

export interface UseBoopOptions {
  x?: number
  y?: number
  rotation?: number
  scale?: number
  timing?: number
  springConfig: SpringConfig
}

type ReturnedStyle = {} | AnimatedValue<Pick<CSSProperties, 'transform'>>
type UseBoopTrigger = () => void

const useBoop = ({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1,
  timing = 150,
  springConfig = {
    tension: 300,
    friction: 10,
  },
}): [ReturnedStyle, UseBoopTrigger] => {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [isBooped, setIsBooped] = useState(false)

  const style = useSpring({
    transform: isBooped
      ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`
      : `translate(0px, 0px)
         rotate(0deg)
         scale(1)`,
    config: springConfig,
  })

  useEffect(() => {
    if (!isBooped) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setIsBooped(false)
    }, timing)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [isBooped, timing])

  const trigger: UseBoopTrigger = useCallback(() => {
    setIsBooped(true)
  }, [])

  const appliedStyle: ReturnedStyle = prefersReducedMotion ? {} : style

  return [appliedStyle, trigger]
}

export default useBoop
