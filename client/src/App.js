import "bootstrap/dist/css/bootstrap.min.css";
import "./css/app.scss";

import React, { Fragment } from "react";
import Routes from "./components/route/Routes";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <Routes />
      </Fragment>
    </Provider>
  );
}

export default App;
