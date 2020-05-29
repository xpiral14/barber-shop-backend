import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
export default function PrivateRoute({ authLevel, ...props }) {
  const level = useSelector((s) => s.user.level);

  const defaultLevelRoute = {
    [1]: "/appointments",
    [2]: "/makeAppointment",
  };
  if (!authLevel) return <Route {...props} />;

  if (!level) return <Redirect to="/" />;

  if (!authLevel.includes(level))
    return <Redirect to={defaultLevelRoute[level]} />;

  return <Route {...props} />;
}
