import React from "react";

class Home extends React.Component {
  render() {
    return (
      <div>
        <h3>Home Component</h3>
        <p>{this.props.loggedInStatus}</p>
      </div>
    );
  }
}

export default Home;
