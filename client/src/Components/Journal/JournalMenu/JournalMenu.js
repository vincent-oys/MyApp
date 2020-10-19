import React from "react";
import { Link } from "react-router-dom";

class JournalMenu extends React.Component {
  render() {
    return (
      <div>
        <li>
          <Link to={`/journal/${this.props.userId}/create`}>Add a Journal</Link>
        </li>
      </div>
    );
  }
}

export default JournalMenu;
