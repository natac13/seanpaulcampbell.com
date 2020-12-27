import { Dispatch, SetStateAction, useState } from 'react'
import { useDeepCompareCallback } from 'use-deep-compare'

const useSessionStorage = <T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.sessionStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      return initialValue
    }
  })

  const setValue = useDeepCompareCallback(
    (value: unknown) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        // Save state
        setStoredValue(valueToStore)
        // Save to local storage
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore))
        return valueToStore
      } catch (error) {
        // A more advanced implementation would handle the error case
        return null
      }
    },
    [storedValue, setStoredValue]
  )

  return [storedValue, setValue]
}

export default useSessionStorage
