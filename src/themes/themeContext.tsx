import React from 'react'

interface ThemeContextInterface {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean | null>>
  darkMode: boolean
}

interface Props {
  children: React.ReactNode
  value: Partial<ThemeContextInterface>
}
const ThemeContext = React.createContext<Partial<ThemeContextInterface>>({})

// eslint-disable-next-line react/prop-types
export const CustomThemeProvider: React.FC<Props> = ({
  value,
  children,
}: Props) => {
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeContext
