import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

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
})

export default theme
