import merge from 'lodash/merge'
import { createMuiTheme, ThemeOptions } from '@material-ui/core'
import blueGrey from '@material-ui/core/colors/blueGrey'
import cyan from '@material-ui/core/colors/cyan'

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
    primary: {
      main: cyan[800],
    },
    secondary: {
      main: blueGrey[600],
    },
  },
}

export const darkPalette: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: cyan[400],
      contrastText: 'rgb(0,0,0,0.87)',
    },
    secondary: {
      main: blueGrey[100],
      contrastText: 'rgb(0,0,0,0.87)',
    },
  },
}

export const lightTheme = createMuiTheme(merge(lightPalette, base))
export const darkTheme = createMuiTheme(merge(darkPalette, base))
