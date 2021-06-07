import React from 'react'
import { BrowserRouter, Switch, Route as ReactDomRoute } from 'react-router-dom'
import Index from '../Pages/Index'
import Login from '../Pages/Login'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <ReactDomRoute path='/' exact component={Index} />
        <ReactDomRoute path='/login' component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes

