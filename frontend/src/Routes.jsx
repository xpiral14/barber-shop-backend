import React from "react";
import { Switch, Route } from "react-router-dom";
import Autenticated from "./pages/Autenticated";
import Appointments from "./pages/Appointments";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import { EMPLOYEE } from "./constants/userLevel";
import Header from "./components/Header";
export default function Routes() {
  return (
    <Switch>
      <PrivateRoute path="/" exact component={Login} />
      <PrivateRoute path="/main" exact component={Autenticated} />
      <PrivateRoute authLevel = {[EMPLOYEE]} path="/appointments" component={Appointments}  />
    </Switch>
  );
}
