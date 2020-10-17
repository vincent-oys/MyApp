import React from "react";
import axios from "axios";

export default class Test extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "",
    };

    this.test = this.test.bind(this);
  }

  componentDidMount() {
    this.test();
  }

  test() {
    axios
      .get("/api/ping")
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.setState({
            message: res.data,
          });
        } else {
          this.setState({
            message: "Something Wrong",
          });
        }
      })
      .catch((err) => {
        this.setState({
          message: "API not working",
        });
      });
  }

  render() {
    return (
      <>
        <h1>{this.state.message}</h1>
      </>
    );
  }
}
