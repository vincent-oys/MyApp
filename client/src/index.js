import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route render={(props) => <App {...props} />} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
