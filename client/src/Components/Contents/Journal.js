import React from "react";
import JournalCard from "../Journal/JournalCard/JournalCard";
import "../Journal/JournalContent/JournalContent.css";
import JournalMenu from "../Journal/JournalMenu/JournalMenu";
import "./Journal.css";

class Journal extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      journalPerPage: 4,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  render() {
    let { journalData, userId } = this.props;
    journalData = journalData.reverse();

    let { currentPage, journalPerPage } = this.state;

    const indexOfLast = currentPage * journalPerPage;
    const indexOfFirst = indexOfLast - journalPerPage;
    const currentJournals = journalData.slice(indexOfFirst, indexOfLast);

    let journals = currentJournals.map((data, index) => {
      return (
        <div key={index}>
          <JournalCard data={data} />
        </div>
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(journalData.length / journalPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <li key={number} id={number} onClick={this.handleClick}>
          {number}
        </li>
      );
    });

    return (
      <div className="content-page">
        <div className="journal-menu">
          <JournalMenu history={this.props.history} userId={userId} />
        </div>

        <div className="journal-content">
          <div>{journals}</div>
          <ul id="page-numbers">{renderPageNumbers}</ul>
        </div>
      </div>
    );
  }
}

export default Journal;
