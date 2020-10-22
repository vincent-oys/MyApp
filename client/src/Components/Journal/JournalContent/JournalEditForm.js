import React from "react";
import axios from "axios";

class JournalEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      date: "",
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.getSingleJournal = this.getSingleJournal.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  getSingleJournal() {
    let journalId = this.props.match.params.journalid;
    let url = `/api/journal/${journalId}`;
    console.log(journalId);
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        console.log(res);
        this.setState({
          title: res.data.title,
          content: res.data.content,
          date: res.data.date,
        });
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.getSingleJournal();
  }

  submitHandler(e) {
    e.preventDefault();
    let journalId = this.props.match.params.journalid;
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
        this.props.refreshJournal();
        this.props.history.push(`/journal`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteHandler(e) {
    e.preventDefault();
    let journalId = this.props.match.params.journalid;
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
                defaultValue={this.state.date}
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
                Save
              </button>
            </div>
          </form>
          <div className="button-center">
            <button onClick={this.deleteHandler} className="form-button-delete">
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default JournalEditForm;
