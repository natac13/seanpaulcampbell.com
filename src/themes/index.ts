import merge from 'lodash/merge'
import { createMuiTheme, ThemeOptions } from '@material-ui/core'

const base: ThemeOptions = {
  palette: {
    contrastThreshold: 4.5,
  },
  typography: {
    fontSize: 16,
  },
}

export const lightPalette: ThemeOptions = {
  palette: {
    mode: 'light',
    // primary: {
    // main: '#1d5d99',
    // light: '#4a7dad',
    // dark: '#14416b',
    // contrastText: '#fff',
    // },
    // secondary: {
    // main: '#887400',
    // light: '#9f8f33',
    // dark: '#5f5100',
    // contrastText: '#fff',
    // },
  },
}

export const darkPalette: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#00befe',
      light: '#33cbfe',
      dark: '#0085b1',
      contrastText: 'rgb(0,0,0,0.87)',
    },
    secondary: {
      main: '#b0b093',
      light: '#bfbfa8',
      dark: '#7b7b66',
      contrastText: 'rgb(0,0,0,0.87)',
    },
  },
}

export const lightTheme = createMuiTheme(merge(lightPalette, base))
export const darkTheme = createMuiTheme(merge(darkPalette, base))
