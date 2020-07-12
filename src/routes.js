import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/Home';
import Admin from "./components/Admin";
import Helper from "./components/Helper";

const Routes = () => (
  <Router>
    <Route exact path="/productid=:productid&imageid=:imageid" component={Home} />
    {/* <Route exact path="/admin" component={Admin} /> */}
    <Route exact path="/helper" component={Helper} />
  </Router>
);

export default Routes;