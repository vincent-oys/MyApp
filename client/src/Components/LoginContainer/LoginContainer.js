import React from "react";
import Register from "./Register/Register";
import Login from "./Login/Login";

class LoginContainer extends React.Component {
  constructor() {
    super();

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth() {
    this.props.handleLogin();
    this.props.history.push("/home");
  }
  render() {
    return (
      <div>
        <p>{this.props.loggedInStatus}</p>
        <Register handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    );
  }
}

export default LoginContainer;
