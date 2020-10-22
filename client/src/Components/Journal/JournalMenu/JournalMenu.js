import React from "react";
import "./JournalMenu.css";

class JournalMenu extends React.Component {
  render() {
    return (
      <div>
        <div
          onClick={() => {
            this.props.history.push(`/journal/${this.props.userId}/create`);
          }}
          className="journal-entry"
        >
          Journal Entry
        </div>
      </div>
    );
  }
}

export default JournalMenu;
