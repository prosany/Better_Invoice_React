import React from "react";
import ReactDOM from "react-dom";
import "./Styles/global.scss";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import axios from "axios";
import { Provider } from "react-redux";
import store, { persistor } from "./Store";
import "bootstrap/dist/css/bootstrap.min.css";
import { PersistGate } from "redux-persist/integration/react";

const date = new Date().getDate();

axios.defaults.baseURL =
  date <= 15 ? process.env.REACT_APP_API_URL : process.env.REACT_APP_API_URL2;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
