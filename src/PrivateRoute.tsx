import React, { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

interface Props {
  component: any;
  exact: boolean;
  path: string;
}

export const PrivateRoute: FC<Props> = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
};
