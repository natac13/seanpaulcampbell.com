import { useState, useRef, useLayoutEffect, RefObject } from 'react'

// https://css-tricks.com/making-sense-of-react-spring/

export function useHeight({ on = true } = {}): [
  RefObject<HTMLDivElement>,
  number | string
] {
  const ref = useRef<HTMLDivElement>(null)
  const [height, set] = useState<number | string>(0)
  const heightRef = useRef(height)
  const [ro] = useState(
    () =>
      // @ts-expect-error
      new ResizeObserver(() => {
        if (ref.current && heightRef.current !== ref.current.offsetHeight) {
          heightRef.current = ref.current.offsetHeight
          set(ref.current.offsetHeight)
        }
      })
  )
  useLayoutEffect(() => {
    if (on && ref.current) {
      set(ref?.current.offsetHeight)
      ro.observe(ref?.current, {})
    }
    return () => ro.disconnect()
  }, [on, ro])

  return [ref, height]
}
