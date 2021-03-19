import React, { FC, useContext, useEffect } from 'react'
import {
  Route as ReactDomRoute,
  RouteProps as ReactDomRouteProps,
  useHistory,
} from 'react-router-dom'
import Navigation from '../Components/Navigation'
import { userDataContext } from '../context/UserData'

interface RouteProps extends ReactDomRouteProps {
  component: React.FC<any>
}

const Route: FC<RouteProps> = ({ component: Component, ...rest }) => {
  const { user } = useContext(userDataContext)
  const history = useHistory()

  useEffect(() => {
    if (!user) {
      history.push('/login')
    }
  }, [user])

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