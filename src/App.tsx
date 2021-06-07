import React from 'react'
import Routes from './Routes'
import { SnackbarProvider } from 'notistack'
import 'jspanel4/es6module/extensions/modal/jspanel.modal'
import 'jspanel4/dist/jspanel.min.css'
const App: React.FC = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <Routes />
    </SnackbarProvider>
  )
}

export default App
