import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import history from "../../services/history";
import Button from "../button/button.jsx";
import authentication from "../../services/authentication";
import "./navbar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false };
  }

  handleLogout = () => {
    authentication.logout();
    history.push("/");
    // <Redirect to="/" refresh="true" />;
    window.location.href = '/'
  };

  render() {
    this.setState = authentication.isAuthenticated();
    console.log(this.setState)
    return (
      <React.Fragment>
        <ul className="navigation">
        {!this.setState ? <>
              <li>
                <NavLink to="/">
                  <img src="logo.png" className="logo" alt="logo"></img>
                </NavLink>
              </li>
            </> : <>
              <li>
                <NavLink to="/">
                  <img src="logo.png" className="logo" alt="logo"></img>
                </NavLink>
              </li>
              <li>
                <Button onClick={this.handleLogout} value="Déconnexion" className="login-button" />
              </li>
            </>}
          
        </ul>
      </React.Fragment>
    );
  }
}

export default NavBar;
