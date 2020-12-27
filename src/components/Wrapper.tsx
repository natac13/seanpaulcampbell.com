import { ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import React, { useMemo } from 'react'
import useDarkMode from 'use-dark-mode'
import { darkTheme, lightTheme } from '../themes'
import { CustomThemeProvider } from '../themes/themeContext'
import SnackbarProvider from './SnackbarProvider'

interface Props {
  children: React.ReactNode
}

const Wrapper: React.FC<Props> = (props: Props) => {
  const darkMode = useDarkMode(false)
  const prefersDarkMode = darkMode.value
  const theme = useMemo(() => (prefersDarkMode ? darkTheme : lightTheme), [
    prefersDarkMode,
  ])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomThemeProvider
        value={{
          setDarkMode: darkMode.toggle,
          darkMode: prefersDarkMode,
        }}
      >
        <SnackbarProvider theme={theme}>{props.children}</SnackbarProvider>
      </CustomThemeProvider>
    </ThemeProvider>
  )
}

export default Wrapper
