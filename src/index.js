import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import API from "./api";
import { Provider } from "react-redux";
import configureStore from "./redux/reducers/configureStore";
import 'alertifyjs/build/css/alertify.min.css'
import "./app.css"

const store = configureStore();
var instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    //console.log(config);
    let token = localStorage.getItem("mezura:token");
    // if (config.data)
    //  config.data.token = // Vue.cookie.get("userToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

API.initialize("http://mezuraapi.yaseminhidir.com", instance);

ReactDOM.render(
  <React.StrictMode>
       <BrowserRouter>
    <Provider store={store}>
      <App />{" "}
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
