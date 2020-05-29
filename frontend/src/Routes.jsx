import React from "react";
import { Switch, Route } from "react-router-dom";
import Autenticated from "./pages/Autenticated";
import Appointments from "./pages/Appointments";
import PrivateRoute from "./components/PrivateRoute";
export default function Routes() {
  return (
    <Switch>
      <PrivateRoute authLevel={[2]} path="/" exact component={() => <h1>Login</h1>} />
      <Route path="/main" exact component={Autenticated} />
      <Route path="/appointment" component={Appointments} />
    </Switch>
  );
}
