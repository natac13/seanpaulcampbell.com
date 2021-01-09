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
import SnackbarProvider from './SnackbarProvider'
import { TypographyOptions } from '@material-ui/core/styles/createTypography'
import useDarkMode from 'use-dark-mode'

interface Props {
  children: React.ReactNode
}

const headerCommon: TypographyOptions = {
  fontFamily: `'Playfair Display', 'Times New Roman', serif`,
}

const Wrapper: React.FC<Props> = (props: Props) => {
  const darkMode = useDarkMode(false)
  const prefersDarkMode = darkMode.value
  const [fontSize, setFontSize] = useFontSizeState(16)

  const theme = useMemo(() => {
    const accessibility: ThemeOptions = {
      palette: {
        contrastThreshold: 4.6,
      },
      typography: {
        fontSize,
        h1: { fontWeight: 400 },
        h2: {
          ...headerCommon,
        },
        h3: {
          ...headerCommon,
        },
        h4: {
          ...headerCommon,
        },
        h5: {
          ...headerCommon,
        },
        h6: {
          ...headerCommon,
        },
      },
    }

    let mergeThemeConfig: ThemeOptions
    if (prefersDarkMode) {
      mergeThemeConfig = merge(darkPalette, accessibility)
    } else {
      mergeThemeConfig = merge(lightPalette, accessibility)
    }

    return responsiveFontSizes(createMuiTheme(mergeThemeConfig))
  }, [prefersDarkMode, fontSize])

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
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
          <SoundProvider>
            <SnackbarProvider theme={theme}>{props.children}</SnackbarProvider>
          </SoundProvider>
        </FontSizeProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  )
}

export default Wrapper
