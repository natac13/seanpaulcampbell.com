import React from 'react'
import createPersistedState from 'use-persisted-state'

const useFontSizeState = createPersistedState('FONT_SIZE')

interface FontSizeContextInterface {
  setFontSize: React.Dispatch<React.SetStateAction<number>>
  fontSize: number
}

interface Props {
  children: React.ReactNode
  value: FontSizeContextInterface
}

const FontSizeContext = React.createContext<
  FontSizeContextInterface | undefined
>(undefined)

const FontSizeProvider: React.FC<Props> = ({ children, value }: Props) => {
  return (
    <FontSizeContext.Provider value={value}>
      {children}
    </FontSizeContext.Provider>
  )
}

const useFontSizeContext = () => {
  const context = React.useContext(FontSizeContext)
  if (context === undefined) {
    throw new Error('useFontSize must be used withing a FontSizeContext')
  }

  return context
}

export { FontSizeProvider, useFontSizeContext, useFontSizeState }
