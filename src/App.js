import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { publicRoute, privateRoute, errorRoute } from "./Routes/Routes";
import { PrivateRoute } from "./Routes/Middleware";
import Layouts from "./Layouts";
import NoLoginLayout from "./Layouts/NoLoginLayout";
import { useLocation } from "react-router-dom";

const App = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.includes("netlify")) {
      window.location.href = "https://better-invoice.cf/";
    }
  }, [pathname]);
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {publicRoute.map((route, idx) => (
            <Route
              exact
              key={idx}
              path={route.path}
              component={route.component}
              layout={NoLoginLayout}
            />
          ))}

          {privateRoute.map((route, idx) => (
            <PrivateRoute
              exact
              key={idx}
              layout={Layouts}
              path={route.path}
              component={route.component}
              isProtected={true}
            />
          ))}

          {errorRoute.map((route, idx) => (
            <Route
              exact
              key={idx}
              path={route.path}
              component={route.component}
              layout={NoLoginLayout}
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
