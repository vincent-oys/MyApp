import React from "react";
import Register from "./Register/Register";
import { Link } from "react-router-dom";

class RegisterContainer extends React.Component {
  constructor() {
    super();

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth() {
    this.props.handleLogin();
    this.props.history.push("/");
  }
  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-page">
          <Register handleSuccessfulAuth={this.handleSuccessfulAuth} />
          <p>
            Already have an account?{"  "}
            <Link to="/login" className="auth-link">
              Login Now
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default RegisterContainer;
