import React from "react";
import ReactDOM from "react-dom";
import "./Styles/global.scss";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./Store";
import "bootstrap/dist/css/bootstrap.min.css";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
