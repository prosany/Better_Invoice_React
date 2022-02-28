import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({
  component: Component,
  isAuthProtected,
  layout: Layout,
  ...rest
}) {
  return (
    <Route
      render={(props) => {
        if (isAuthProtected && localStorage.getItem("token")) {
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          );
        }
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }}
    />
  );
}
