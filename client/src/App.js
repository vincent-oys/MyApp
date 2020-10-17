import React from "react";
import "./App.css";
import Expense from "./Components/Contents/Expense";
import Home from "./Components/Contents/Home";
import Journal from "./Components/Contents/Journal";
import LoginContainer from "./Components/LoginContainer/LoginContainer";
import Test from "./Components/Test/Test";
import NavBar from "./Components/NavBar/NavBar";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    const url = "/api/users/auth";
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        console.log(res);
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {},
        });
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin() {
    this.checkLoginStatus();
  }

  handleLogout() {
    const url = "/api/users/logout";
    axios
      .get(url)
      .then((res) =>
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {},
        })
      )
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              render={(props) => (
                <NavBar
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  handleLogout={this.handleLogout}
                />
              )}
            />
          </Switch>

          <Switch>
            <Route
              exact
              path="/test"
              render={(props) => (
                <Test {...props} loggedInStatus={this.state.loggedInStatus} />
              )}
            />
            <Route
              exact
              path="/"
              render={(props) => (
                <Home {...props} loggedInStatus={this.state.loggedInStatus} />
              )}
            />
            <Route
              exact
              path="/journal"
              render={(props) =>
                this.state.loggedInStatus === "NOT_LOGGED_IN" ? (
                  <Redirect to="/" />
                ) : (
                  <Journal
                    {...props}
                    loggedInStatus={this.state.loggedInStatus}
                  />
                )
              }
            />
            <Route
              exact
              path="/expense"
              render={(props) =>
                this.state.loggedInStatus === "NOT_LOGGED_IN" ? (
                  <Redirect to="/" />
                ) : (
                  <Expense
                    {...props}
                    loggedInStatus={this.state.loggedInStatus}
                  />
                )
              }
            />
            <Route
              exact
              path="/login"
              render={(props) =>
                this.state.loggedInStatus === "LOGGED_IN" ? (
                  <Redirect to="/" />
                ) : (
                  <LoginContainer
                    {...props}
                    loggedInStatus={this.state.loggedInStatus}
                    handleLogin={this.handleLogin}
                  />
                )
              }
            />
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
