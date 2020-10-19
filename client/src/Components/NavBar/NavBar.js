import React from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";

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
            {menuItems}
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  this.buttonOnClick();
                }}
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
