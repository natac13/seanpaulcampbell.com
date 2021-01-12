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
import { ThemeProvider } from '../context/theme'
import { SoundProvider } from '../context/sound'
import { FontSizeProvider, useFontSizeState } from '../context/fontSize'
import {
  FontFamily,
  FontFamilyProvider,
  sansSerifFontFamily,
  serifFontFamily,
  useFontFamilyState,
} from '../context/fontFamily'
import SnackbarProvider from './SnackbarProvider'
import useDarkMode from 'use-dark-mode'
import { DARK_MODE, FONT_FAMILY_DEFAULT, FONT_SIZE_DEFAULT } from '../constants'

interface Props {
  children: React.ReactNode
}

const Wrapper: React.FC<Props> = (props: Props) => {
  const darkMode = useDarkMode(false, { storageKey: DARK_MODE })
  const prefersDarkMode = darkMode.value
  const [fontSize, setFontSize] = useFontSizeState(FONT_SIZE_DEFAULT)
  const [fontFamily, setFontFamily] = useFontFamilyState<FontFamily>(
    FONT_FAMILY_DEFAULT
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
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
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
