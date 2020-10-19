import React from "react";
import "./Journal.css";
import JournalMenu from "../Journal/JournalMenu/JournalMenu";
import JournalForm from "../Journal/JournalContent/JournalForm";
import JournalSummary from "../Journal/JournalContent/JournalSummary";
import JournalView from "../Journal/JournalContent/JournalView";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class Journal extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Router>
        <div className="content-page">
          <Switch>
            <div className="content-menu">
              <JournalMenu />
            </div>
          </Switch>
          <Switch>
            <div className="content">
              <p>{this.props.loggedInStatus}</p>
              <p>{this.props.username}</p>
              <p>{this.props.userId}</p>
              <JournalForm />
              <JournalSummary />
              <JournalView />
            </div>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Journal;
