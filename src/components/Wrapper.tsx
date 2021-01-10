import merge from 'lodash/merge'
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeOptions,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import React, { useMemo } from 'react'
import { darkPalette, lightPalette } from '../themes'
import { ThemeProvider, useThemeContext } from '../context/theme'
import { SoundProvider } from '../context/sound'
import {
  FontSizeProvider,
  useFontSizeContext,
  useFontSizeState,
} from '../context/fontSize'
import {
  FontFamily,
  FontFamilyProvider,
  sansSerifFontFamily,
  serifFontFamily,
  useFontFamilyState,
} from '../context/fontFamily'
import SnackbarProvider from './SnackbarProvider'
import useDarkMode from 'use-dark-mode'

interface Props {
  children: React.ReactNode
}

const Wrapper: React.FC<Props> = (props: Props) => {
  const darkMode = useDarkMode(false)
  const prefersDarkMode = darkMode.value
  const [fontSize, setFontSize] = useFontSizeState(16)
  const [fontFamily, setFontFamily] = useFontFamilyState<FontFamily>(
    'sans-serif'
  )

  const theme = useMemo(() => {
    const accessibility: ThemeOptions = {
      palette: {
        contrastThreshold: 3,
      },
      typography: {
        fontSize,
        fontFamily:
          fontFamily === 'serif' ? serifFontFamily : sansSerifFontFamily,
        h1: { fontWeight: 400 },
      },
    }

    let mergeThemeConfig: ThemeOptions
    if (prefersDarkMode) {
      mergeThemeConfig = merge(darkPalette, accessibility)
    } else {
      mergeThemeConfig = merge(lightPalette, accessibility)
    }

    return responsiveFontSizes(createMuiTheme(mergeThemeConfig))
  }, [prefersDarkMode, fontSize, fontFamily])

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <SoundProvider>
        <ThemeProvider
          value={{
            darkMode: prefersDarkMode,
            setDarkMode: darkMode.toggle,
          }}
        >
          <FontSizeProvider
            value={{
              fontSize,
              setFontSize,
            }}
          >
            <FontFamilyProvider value={{ fontFamily, setFontFamily }}>
              <SnackbarProvider theme={theme}>
                {props.children}
              </SnackbarProvider>
            </FontFamilyProvider>
          </FontSizeProvider>
        </ThemeProvider>
      </SoundProvider>
    </MuiThemeProvider>
  )
}

export default Wrapper
