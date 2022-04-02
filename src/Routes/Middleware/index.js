import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({
  component: Component,
  isProtected,
  layout: Layout,
  ...rest
}) => {
  const information = useSelector((state) => state.login);
  // useEffect(() => {
  //   const handleToken = async () => {
  //     try {
  //       if (!information.user.accessToken || !information.user.refreshToken) {
  //         localStorage.clear();
  //       }
  //       if (information.user.accessToken && information.user.refreshToken) {
  //         let results = await jwt_decode(information.user.accessToken);
  //         if (Date.now() >= results.exp * 1000) {
  //           const getToken = await post(
  //             "/api/v1/refresh",
  //             {},
  //             {
  //               headers: {
  //                 refresh_token: information.user.refreshToken,
  //               },
  //             }
  //           );
  //           dispatch(loginSuccess("", getToken));
  //         } else {
  //           history.push("/");
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error.response);
  //     }
  //   };
  //   handleToken();
  // }, []);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          isProtected &&
          information.user.accessToken &&
          information.user.refreshToken
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
