import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { post } from "../../Helpers/APIHelper";
import { useHistory } from "react-router-dom";

export const PrivateRoute = ({
  component: Component,
  isProtected,
  layout: Layout,
  ...rest
}) => {
  const history = useHistory();
  useEffect(() => {
    const handleToken = async () => {
      try {
        let accessToken = localStorage.getItem("accessToken");
        let refreshToken = localStorage.getItem("refreshToken");
        if (!accessToken || !refreshToken) {
          localStorage.clear();
        }
        if (accessToken && refreshToken) {
          let results = await jwt_decode(accessToken);
          if (Date.now() >= results.exp * 1000) {
            const getToken = await post(
              "/api/v1/refresh",
              {},
              {
                headers: {
                  refresh_token: refreshToken,
                },
              }
            );
            localStorage.setItem("accessToken", getToken.accessToken);
            localStorage.setItem("accessToken", getToken.refreshToken);
          } else {
            history.push("/");
          }
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    handleToken();
  }, []);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          isProtected &&
          localStorage.getItem("accessToken") &&
          localStorage.getItem("refreshToken")
        ) {
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          );
        }
        return (
          <Layout>
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          </Layout>
        );
      }}
    />
  );
};
