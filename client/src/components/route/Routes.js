import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import NotFound404 from "../pages/NotFound404";

function Routes() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/*' component={NotFound404} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default Routes;
