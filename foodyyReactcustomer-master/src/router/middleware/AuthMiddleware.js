import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthMiddleware = ({
  component: Component,
  //   layout: Layout,
  isAuthProtected,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthProtected) {
          return (
            <Redirect
              to={{ pathname: "/signin", state: { from: props.location } }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};
export default AuthMiddleware;
