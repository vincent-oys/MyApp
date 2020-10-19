import React from "react";
import JournalMenu from "../JournalMenu/JournalMenu";
import axios from "axios";

class JournalEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.singleJournal.title,
      content: this.props.singleJournal.content,
      date: this.props.singleJournal.date,
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitHandler(e) {
    e.preventDefault();
    let journalId = this.props.singleJournal._id;
    const body = {
      title: this.state.title,
      content: this.state.content,
      date: this.state.date,
    };
    let url = `/api/journal/${journalId}/edit`;
    axios
      .put(url, body, { withCredentials: true })
      .then((res) => {
        console.log(res);
        this.props.history.push(`/journal/${journalId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="content-page">
        <div className="journal-menu">
          <JournalMenu userId={this.props.userId} />
        </div>

        <div className="journal-content">
          <form onSubmit={this.submitHandler}>
            <div className="form-input">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.changeHandler}
                required
              />
            </div>
            <div className="form-input">
              <label>Content:</label>
              <textarea
                name="content"
                value={this.state.content}
                onChange={this.changeHandler}
                required
              />
            </div>
            <div className="form-input">
              <label>Date:</label>
              <input
                type="date"
                name="date"
                defaultValue={this.state.date}
                onChange={this.changeHandler}
                required
              />
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    );
  }
}

export default JournalEditForm;
