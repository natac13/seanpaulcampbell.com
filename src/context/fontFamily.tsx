import React from 'react'
import createPersistedState from 'use-persisted-state'

const useFontFamilyState = createPersistedState('FONT_FAMILY')

type FontFamily = 'sans-serif' | 'serif'

interface FontFamilyContextInterface {
  setFontFamily: React.Dispatch<React.SetStateAction<FontFamily>>
  fontFamily: FontFamily
}

interface Props {
  children: React.ReactNode
  value: FontFamilyContextInterface
}

const FontFamilyContext = React.createContext<
  FontFamilyContextInterface | undefined
>(undefined)

const FontFamilyProvider: React.FC<Props> = ({ children, value }: Props) => {
  return (
    <FontFamilyContext.Provider value={value}>
      {children}
    </FontFamilyContext.Provider>
  )
}

const useFontFamilyContext = () => {
  const context = React.useContext(FontFamilyContext)
  if (context === undefined) {
    throw new Error(
      'useFontFamilyContext must be used withing a FontFamilyContext'
    )
  }

  return context
}

const sansSerifFontFamily = [
  'Open Sans',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
].join(',')

const serifFontFamily = ['"Merriweather"', '"Times New Roman"', 'serif'].join(
  ','
)

export {
  FontFamily,
  FontFamilyProvider,
  useFontFamilyContext,
  useFontFamilyState,
  sansSerifFontFamily,
  serifFontFamily,
}
