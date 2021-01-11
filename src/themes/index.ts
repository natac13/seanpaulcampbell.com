import { ThemeOptions } from '@material-ui/core'
import { amber, cyan } from '@material-ui/core/colors'

export const lightPalette: ThemeOptions = {
  palette: {
    mode: 'light',
    text: {
      secondary: `rgba(0, 0, 0, 0.55)`,
    },
    primary: {
      // main: cyan[800],
      main: '#007887',
    },
    secondary: {
      // main: '#87701c',
      main: '#9b6800',
    },
  },
}

export const darkPalette: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: cyan.A400,
      contrastText: 'rgb(0,0,0,0.87)',
    },
    secondary: {
      main: amber.A700,
      // main: '#fd9a05',
      contrastText: 'rgb(0,0,0,0.87)',
    },
  },
}

// export const lightTheme = responsiveFontSizes(
//   createMuiTheme(merge(lightPalette, base))
// )
// export const darkTheme = responsiveFontSizes(
//   createMuiTheme(merge(darkPalette, base))
// )
