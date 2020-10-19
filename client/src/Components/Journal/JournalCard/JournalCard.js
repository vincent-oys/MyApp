import React from "react";
import { Link } from "react-router-dom";

class JournalCard extends React.Component {
  render() {
    let { _id, title, content, date } = this.props.data;
    return (
      <div>
        <p>
          <Link to={`/journal/${_id}`}>{_id}</Link>
        </p>
        <p>{title}</p>
        <p>{content}</p>
        <p>{date}</p>
      </div>
    );
  }
}

export default JournalCard;
