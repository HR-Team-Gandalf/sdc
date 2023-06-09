import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import AppLoader from "./components/AppLoader.js";
import { store } from "./store.js";
import { Provider } from "react-redux";
import "./style.css";
import "./style.sass";

const container = document.getElementById("bigRoot");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <AppLoader />
  </Provider>
);
