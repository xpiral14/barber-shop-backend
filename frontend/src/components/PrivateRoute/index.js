import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { EMPLOYEE, CLIENT } from "../../constants/userLevel";
import EmployeeTheme from "../../pages/_Theme/Employee";
export default function PrivateRoute({
  authLevel,
  component: Component,
  ...props
}) {
  const user = useSelector((s) => s.user);

  const defaultLevelRoute = {
    [EMPLOYEE]: "/appointments",
    [CLIENT]: "/makeAppointment",
  };

  const aplicationThemes = {
    [EMPLOYEE]: EmployeeTheme,
  };

  console.log(user, authLevel)
  // caso tenha um usuário e a rota é publica
  if (user && !authLevel)
    return <Redirect to={defaultLevelRoute[user.userTypeId]} />;

  //caso não tenha nivel de autorização então significa que a rota é publica.
  if (!authLevel) return <Route component={Component} {...props} />;

  // caso tenha nivel de autorização e não existe um usuário autenticado.
  if (!user) return <Redirect to="/" />;

  // caso tenha nivel de autorização mas não tenha um usuário, retorna para a página de login
  if (!user.userTypeId) return <Redirect to="/login" />;

  //caso tenha nivel de autorização mas o usuário não tem privilégio retorna para a rota padrão que o usuário está autorizado.
  if (!authLevel.includes(user.userTypeId))
    return <Redirect to={defaultLevelRoute[user.userTypeId]} />;

  const UserTheme = aplicationThemes[user.userTypeId];

  return (
    <Route
      component={() => (
        <UserTheme>
          <Component />
        </UserTheme>
      )}
      {...props}
    />
  );
}
