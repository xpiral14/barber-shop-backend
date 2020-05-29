import React from "react";

import { PersistGate } from "redux-persist/integration/react";
import { Router } from "react-router-dom";
import { Provider, useStore } from "react-redux";
import { store, persistor } from "./store";
import history from "./services/history";
import { ToastContainer, toast } from "react-toastify";

import GlobalStyle from "./GlobalStyle";
import Theme from "./Theme";
import Routes from "./Routes";
import Header from "./components/Header";

export default function App() {
  return (
    <Router history={history}>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <ToastContainer />
          <Theme>
            <GlobalStyle />
            <Routes />
          </Theme>
        </Provider>
      </PersistGate>
    </Router>
  );
}
