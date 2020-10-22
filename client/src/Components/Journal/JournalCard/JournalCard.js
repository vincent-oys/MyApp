import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./JournalCard.css";

class JournalCard extends React.Component {
  render() {
    let { _id, title, content, date, picNumber } = this.props.data;
    let year = moment(date).format("YYYY");
    let month = moment(date).format("MMM");
    let day = moment(date).format("Do");
    return (
      <div className="row">
        <div className="journal-card">
          <div className="date">
            <span className="day">{day}</span>
            <span className="month">{month}</span>
            <span className="year">{year}</span>
          </div>

          <div className="wrapper">
            <div className="image">
              <img
                src={`https://picsum.photos/id/${picNumber}/260/300`}
                alt="img placeholder"
              />
            </div>

            <div className="data">
              <div className="content">
                <h3 className="title">{title}</h3>
                <p className="text">{content}</p>
              </div>
              <i className="material-icons edit">
                <Link to={`/journal/${_id}/edit`} className="edit-icon">
                  edit
                </Link>
              </i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JournalCard;
