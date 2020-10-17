import React from "react";

class Journal extends React.Component {
  render() {
    return (
      <div>
        <h3>Journal Component</h3>
        <p>{this.props.loggedInStatus}</p>
      </div>
    );
  }
}

export default Journal;
