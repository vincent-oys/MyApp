import React from "react";

class Expense extends React.Component {
  render() {
    return (
      <div>
        <h3>Expense Component</h3>
        <p>{this.props.loggedInStatus}</p>
      </div>
    );
  }
}

export default Expense;
