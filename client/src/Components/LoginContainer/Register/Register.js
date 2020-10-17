import React from "react";
import axios from "axios";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      valid: true,
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  submitHandler(e) {
    e.preventDefault();
    const url = "/api/users/new";
    const body = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post(url, body, { withCredentials: true })
      .then((res) => {
        this.props.handleSuccessfulAuth();
      })
      .catch((err) => {
        if (err.response.status === 500) {
          this.setState({
            errorMessage: err.response.data,
            valid: false,
          });
        } else if (err.response.status === 401) {
          this.setState({
            errorMessage: err.response.data,
            valid: false,
          });
        }
      });
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div className="form-input">
            <input
              type="text"
              name="username"
              value={this.state.username}
              placeholder="Username"
              onChange={this.changeHandler}
              required
            />
          </div>
          <div className="form-input">
            <input
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.changeHandler}
              required
            />
          </div>
          <div
            style={
              this.state.valid
                ? { visibility: "hidden", margin: "10px 0" }
                : { visibility: "visible", color: "red", margin: "10px 0" }
            }
          >
            {this.state.errorMessage}
          </div>
          <div className="form-input">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
