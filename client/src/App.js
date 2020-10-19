import React from "react";
import "./App.css";
import Expense from "./Components/Contents/Expense";
import Home from "./Components/Contents/Home";
import Journal from "./Components/Contents/Journal";
import LoginContainer from "./Components/LoginContainer/LoginContainer";
import Test from "./Components/Test/Test";
import JournalForm from "./Components/Journal/JournalContent/JournalForm";
import JournalView from "./Components/Journal/JournalContent/JournalView";
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
      singleJournal: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.getJournal = this.getJournal.bind(this);
    this.refreshJournal = this.refreshJournal.bind(this);
    this.getSingleJournal = this.getSingleJournal.bind(this);
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
          singleJournal: {},
        });
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
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
          singleJournal: {},
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

  getSingleJournal(journalId) {
    let url = `/api/journal/${journalId}`;
    console.log(journalId);
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        console.log(res);
        this.setState({
          singleJournal: res.data,
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
              path="/journal/:userid/create"
              render={(props) => (
                <JournalForm
                  {...props}
                  userId={this.state.userId}
                  refreshJournal={this.refreshJournal}
                />
              )}
            />
            <Route
              exact
              path="/journal/:journalid"
              render={(props) => (
                <JournalView
                  {...props}
                  userId={this.state.userId}
                  getSingleJournal={this.getSingleJournal}
                  singleJournal={this.state.singleJournal}
                  refreshJournal={this.refreshJournal}
                />
              )}
            />
            <Route
              exact
              path="/journal/:journalid/edit"
              render={(props) => (
                <JournalEditForm
                  {...props}
                  userId={this.state.userId}
                  getSingleJournal={this.getSingleJournal}
                  singleJournal={this.state.singleJournal}
                />
              )}
            />

            {/* <Redirect from="*" to="/" /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
