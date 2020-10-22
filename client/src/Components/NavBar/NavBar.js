import React from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";
import "./NavBar.css";

class NavBar extends React.Component {
  constructor() {
    super();

    this.buttonOnClick = this.buttonOnClick.bind(this);
  }

  buttonOnClick() {
    if (this.props.loggedInStatus === "LOGGED_IN") {
      this.props.handleLogout();
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    let menuItems = [];
    let buttonName = "Login";
    if (this.props.loggedInStatus === "LOGGED_IN") {
      menuItems = MenuItems.map((item, index) => {
        return (
          <li key={`${index}`}>
            <Link to={`${item.url}`}>{item.title}</Link>
          </li>
        );
      });
      buttonName = "Logout";
    }

    return (
      <div>
        <header>
          <div className="logo">
            <h1>MyApp</h1>
          </div>
          <ul>
            {this.props.loggedInStatus === "LOGGED_IN" ? (
              menuItems
            ) : (
              <li>
                <Link to="/">Home</Link>
              </li>
            )}

            <li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  this.buttonOnClick();
                }}
                className="nav-auth"
                style={
                  this.props.loggedInStatus === "LOGGED_IN"
                    ? { backgroundColor: "red" }
                    : { backgroundColor: "lightgreen" }
                }
              >
                {buttonName}
              </button>
            </li>
          </ul>
        </header>
      </div>
    );
  }
}

export default NavBar;
