import { ThemeOptions } from '@material-ui/core'
import { amber, cyan } from '@material-ui/core/colors'

export const lightPalette: ThemeOptions = {
  palette: {
    mode: 'light',
    text: {
      secondary: `rgba(0, 0, 0, 0.55)`,
    },
    primary: {
      main: cyan[800],
    },
    secondary: {
      main: '#87701c',
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
      main: amber.A200,
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
