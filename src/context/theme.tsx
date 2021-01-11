import React from 'react'

interface ThemeContextInterface {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean | null>>
  darkMode: boolean
}

interface Props {
  children: React.ReactNode
  value: ThemeContextInterface
}

const ThemeContext = React.createContext<ThemeContextInterface | undefined>(
  undefined
)

const ThemeProvider: React.FC<Props> = ({ children, value }: Props) => {
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

const useThemeContext = () => {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useDarkModeContext must be used withing a ThemeProvider')
  }

  return context
}

export { ThemeProvider, useThemeContext }
