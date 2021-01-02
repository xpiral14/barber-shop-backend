import React from 'react'
//import Login from './Pages/Login'
//import Dashboard from './Pages/Dashboard'
import NavigationBar from './Components/NavigationBar'
import GlobalBar from './Components/GlobalBar'
import { ThemeProvider } from '@material-ui/core/styles'

const GlobalAppTheme = {
  backgroundColor: '#ff0000',
  fontFamily: 'Roboto',
  borderRadius: '5px',
  spacing: '5px',
}

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={GlobalAppTheme}>
        <GlobalBar />
        <NavigationBar />
      </ThemeProvider>
    </>
  )
}

export default App
