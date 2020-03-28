import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import authContext from "../../context/auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //auth state
  const authCtx = useContext(authContext);
  const { isAuthenticated, isLoading } = authCtx;

  return (
    <Route
      {...rest}
      render={props => {
        if (isLoading) {
          return <h2>Loading...</h2>;
        } else if (!isAuthenticated) {
          return <Redirect to="/login" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
