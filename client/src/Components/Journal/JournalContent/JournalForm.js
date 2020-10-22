import React from "react";
import moment from "moment";
import axios from "axios";
import "./JournalContent.css";

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
        <div className="journal-content">
          <form onSubmit={this.submitHandler}>
            <div className="journal-form-input">
              <p>Title:</p>
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.changeHandler}
                required
                className="form-title"
              />
            </div>
            <div className="journal-form-input">
              <p>Date:</p>
              <input
                type="date"
                name="date"
                defaultValue={`${today}`}
                onChange={this.changeHandler}
                required
                className="form-date"
              />
            </div>
            <div className="journal-form-input">
              <p>Content:</p>
              <textarea
                name="content"
                value={this.state.content}
                onChange={this.changeHandler}
                wrap="off"
                required
                className="form-content"
              />
            </div>
            <div className="button-center">
              <button type="submit" className="form-button">
                New Journal Entry
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default JournalForm;
