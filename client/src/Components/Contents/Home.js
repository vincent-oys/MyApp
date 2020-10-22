import React from "react";
import "./Home.css";

class Home extends React.Component {
  render() {
    let { text, author } = this.props.motivationalQuote;
    return (
      <div className="landing-page">
        <div className="welcome">
          {this.props.loggedInStatus === "LOGGED_IN" ? (
            <h3>Welcome Back, {this.props.username}</h3>
          ) : (
            <h3>Join us today to find out more!</h3>
          )}
        </div>
        <div className="quote">
          <blockquote>{text}</blockquote>
          <cite>{author}</cite>
        </div>
      </div>
    );
  }
}

export default Home;
