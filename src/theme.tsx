import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    mode: 'dark',
    contrastThreshold: 4.5,
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
  typography: {
    fontSize: 16,
    h1: {
      fontSize: '5.6rem',
    },
  },
})

export default responsiveFontSizes(theme)
