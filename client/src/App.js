import React from "react";
import "./App.css";
import Expense from "./Components/Contents/Expense";
import Home from "./Components/Contents/Home";
import Journal from "./Components/Contents/Journal";
import LoginContainer from "./Components/LoginContainer/LoginContainer";
import Test from "./Components/Test/Test";
import NavBar from "./Components/NavBar/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN",
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route
              exact
              path={"/test"}
              render={(props) => (
                <Test {...props} loggedInStatus={this.state.loggedInStatus} />
              )}
            />
            <Route
              exact
              path={"/home"}
              render={(props) => (
                <Home {...props} loggedInStatus={this.state.loggedInStatus} />
              )}
            />
            <Route
              exact
              path={"/journal"}
              render={(props) => (
                <Journal
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path={"/expense"}
              render={(props) => (
                <Expense
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path={"/login"}
              render={(props) => (
                <LoginContainer
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  handleLogin={this.handleLogin}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
