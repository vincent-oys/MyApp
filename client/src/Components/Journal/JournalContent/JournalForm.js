import React from "react";
import moment from "moment";
import axios from "axios";
import "./JournalContent.css";
import JournalMenu from "../JournalMenu/JournalMenu";

class JournalForm extends React.Component {
  constructor() {
    let today = moment(new Date()).format().substr(0, 10);
    super();
    this.state = {
      title: "",
      content: "",
      date: today,
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
    let picNumber = Math.floor(Math.random() * 100);
    const body = {
      title: this.state.title,
      content: this.state.content,
      date: this.state.date,
      picNumber: picNumber,
    };
    let url = `/api/journal/${this.props.userId}/add`;
    axios
      .post(url, body, { withCredentials: true })
      .then((res) => {
        console.log(res);
        this.props.refreshJournal();
        this.props.history.push("/journal");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let today = moment(new Date()).format().substr(0, 10);
    return (
      <div className="content-page">
        <div className="journal-menu">
          <JournalMenu
            history={this.props.history}
            userId={this.props.userId}
          />
        </div>

        <div className="journal-content">
          <p>{this.props.userId}</p>
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
                defaultValue={`${today}`}
                onChange={this.changeHandler}
                required
              />
            </div>
            <button type="submit">New Journal Entry</button>
          </form>
        </div>
      </div>
    );
  }
}

export default JournalForm;
