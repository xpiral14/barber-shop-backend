import React from 'react'
//import Login from './Pages/Login'
//import Dashboard from './Pages/Dashboard'
// eslint-disable-next-line
// import NavigationBar from './Components/NavigationBar'
// import GlobalBar from './Components/GlobalBar'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Navigation from './Components/Navigation'

const GlobalAppTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#008cff',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  // Defining fonts
  typography: {
    fontFamily: [
      'system',
      '-apple-system',
      'Roboto',
      '"Segoe UI"',
      'BlinkMacSystemFont',
      '"Oxygen Sans"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={GlobalAppTheme}>
        <Navigation />
      </ThemeProvider>
    </>
  )
}

export default App
