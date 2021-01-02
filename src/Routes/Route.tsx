import React, { FC } from 'react'
import { Route as ReactDomRoute, RouteProps as ReactDomRouteProps } from 'react-router-dom'
import Navigation from '../Components/Navigation'

interface RouteProps extends ReactDomRouteProps{
  component: React.FC<any>
}

const Route: FC<RouteProps> = ({ component: Component, ...rest }) => {
  console.log('renderizei!')
  return (
    <ReactDomRoute 
      render={(props) => (
        <Navigation>
          <Component {...props} />
        </Navigation>
      )}
      {...rest}
    />
  )
}
export default Route
