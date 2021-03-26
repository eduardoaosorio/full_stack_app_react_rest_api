import React, { useContext } from "react";
import { Context } from "./Context";
import { Route, Redirect } from "react-router-dom";

// higher-order component to protect routes from unauthenticated users
function PrivateRoute({ component: Component, ...rest }) {
  const { authenticatedUser } = useContext(Context);
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticatedUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            // code used to redirect user to the original protected URL he was requesting before being authenticated
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
