import React from "react";
import JournalCard from "../Journal/JournalCard/JournalCard";
import "../Journal/JournalContent/JournalContent.css";
import JournalMenu from "../Journal/JournalMenu/JournalMenu";

class Journal extends React.Component {
  constructor() {
    super();
  }

  render() {
    let { journalData, userId } = this.props;
    journalData = journalData.reverse();

    let journals = journalData.map((data, index) => {
      return (
        <div key={index}>
          <JournalCard data={data} />
        </div>
      );
    });

    return (
      <div className="content-page">
        <div className="journal-menu">
          <JournalMenu userId={userId} />
        </div>

        <div className="journal-content">
          <div>{journals}</div>
        </div>
      </div>
    );
  }
}

export default Journal;
