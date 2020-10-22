import React from "react";
import "./App.css";
import Expense from "./Components/Contents/Expense";
import Home from "./Components/Contents/Home";
import Journal from "./Components/Contents/Journal";
import LoginContainer from "./Components/LoginContainer/LoginContainer";
import RegisterContainer from "./Components/LoginContainer/RegisterContainer";
import JournalForm from "./Components/Journal/JournalContent/JournalForm";
import JournalEditForm from "./Components/Journal/JournalContent/JournalEditForm";
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
      username: "",
      userId: "",
      journalData: [],
      motivationalQuote: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.getJournal = this.getJournal.bind(this);
    this.refreshJournal = this.refreshJournal.bind(this);
    this.getMotivationalQuotes = this.getMotivationalQuotes.bind(this);
  }

  checkLoginStatus() {
    const url = "/api/users/auth";
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        console.log("FROM APP.JS", res.data);
        this.setState({
          loggedInStatus: "LOGGED_IN",
          username: res.data.username,
          userId: res.data.userId,
        });
        this.getJournal();
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          username: "",
          userId: "",
          journalData: [],
        });
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
    this.getMotivationalQuotes();
  }

  handleLogin() {
    this.checkLoginStatus();
  }

  refreshJournal() {
    this.getJournal();
  }

  handleLogout() {
    const url = "/api/users/logout";
    axios
      .get(url)
      .then((res) =>
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          username: "",
          userId: "",
          journalData: [],
        })
      )
      .catch((err) => console.log(err));
    this.props.history.push("/");
  }

  getJournal() {
    const url = `/api/journal/${this.state.userId}/summary`;
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        console.log(res);
        this.setState({
          journalData: res.data,
        });
      })
      .catch((err) => console.log("err in getJournal", err));
  }

  getMotivationalQuotes() {
    axios
      .get("https://type.fit/api/quotes")
      .then((res) => {
        let num = Math.floor(Math.random() * 100);
        console.log(res);
        this.setState({
          motivationalQuote: res.data[num],
        });
      })
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
                  username={this.state.username}
                />
              )}
            />
          </Switch>

          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Home
                  {...props}
                  username={this.state.username}
                  loggedInStatus={this.state.loggedInStatus}
                  motivationalQuote={this.state.motivationalQuote}
                />
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
                    username={this.state.username}
                    userId={this.state.userId}
                    journalData={this.state.journalData}
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
            <Route
              exact
              path="/register"
              render={(props) =>
                this.state.loggedInStatus === "LOGGED_IN" ? (
                  <Redirect to="/" />
                ) : (
                  <RegisterContainer
                    {...props}
                    loggedInStatus={this.state.loggedInStatus}
                    handleLogin={this.handleLogin}
                  />
                )
              }
            />
            <Route
              exact
              path="/journal/:userid/create"
              render={(props) =>
                this.state.loggedInStatus === "NOT_LOGGED_IN" ? (
                  <Redirect to="/" />
                ) : (
                  <JournalForm
                    {...props}
                    userId={this.state.userId}
                    refreshJournal={this.refreshJournal}
                  />
                )
              }
            />
            <Route
              exact
              path="/journal/:journalid/edit"
              render={(props) =>
                this.state.loggedInStatus === "NOT_LOGGED_IN" ? (
                  <Redirect to="/" />
                ) : (
                  <JournalEditForm
                    {...props}
                    userId={this.state.userId}
                    refreshJournal={this.refreshJournal}
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
