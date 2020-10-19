import React from "react";
import { Link } from "react-router-dom";
import JournalMenu from "../JournalMenu/JournalMenu";
import axios from "axios";

class JournalView extends React.Component {
  constructor() {
    super();

    this.singleJournaHandler = this.singleJournaHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  singleJournaHandler() {
    let journalId = this.props.match.params.journalid;
    this.props.getSingleJournal(journalId);
  }

  componentDidMount() {
    this.singleJournaHandler();
  }

  deleteHandler(e) {
    e.preventDefault();
    let journalId = this.props.singleJournal._id;
    let url = `/api/journal/${journalId}/delete`;
    axios
      .delete(url, { withCredentials: true })
      .then((res) => {
        console.log(res);
        this.props.refreshJournal();
        this.props.history.push("/journal");
      })
      .catch((err) => console.log(err));
  }

  render() {
    let { userId } = this.props;
    return (
      <div className="content-page">
        <div className="journal-menu">
          <JournalMenu userId={userId} />
        </div>

        <div className="journal-content">
          <p>testing</p>
          <Link to={`/journal/${this.props.singleJournal._id}/edit`}>
            Edit Journal
          </Link>
          <button onClick={this.deleteHandler}>Delete</button>
          <p>{this.props.singleJournal.title}</p>
          <p>{this.props.singleJournal.content}</p>
          <p>{this.props.singleJournal.date}</p>
        </div>
      </div>
    );
  }
}

export default JournalView;
