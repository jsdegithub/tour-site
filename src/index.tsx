import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import App from "./App";
import "./i18n/config";
import { Provider } from "react-redux";
import store from "./redux/store";
import axios from "axios";

axios.defaults.headers["x-icode"] = "E91174BD05EF4D98";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
