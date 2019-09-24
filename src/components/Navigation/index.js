import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";

const UserNav = ({ user, firebase }) => (
  <>
    <ul className="uk-navbar-nav">
      <li>
        <NavLink activeClassName="active" to={ROUTES.DASHBOARD}>
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to={ROUTES.HIREDRIVER}>
          Hire a Driver
        </NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.ABOUT}>History</NavLink>
      </li>
    </ul>
    <ul className="uk-navbar-nav">
      <li>
        <NavLink to={ROUTES.PROFILE} className="flex ">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src="https://img.icons8.com/bubbles/50/000000/car.png"
            alt={user.username}
          />
          {user.username}
        </NavLink>
        <div uk-dropdown="">
          <ul className="uk-nav uk-dropdown-nav">
            <li>
              <NavLink to={ROUTES.DASHBOARD}>View Orders</NavLink>
            </li>
            <li>
              <NavLink to={ROUTES.DASHBOARD}>Update Profile</NavLink>
            </li>
            <li className="uk-nav-header">More</li>
            <li>
              <NavLink to={ROUTES.SETTINGS}>Settings</NavLink>
            </li>
            <li>
              <NavLink to={ROUTES.DASHBOARD}>Change Password</NavLink>
            </li>
            <li className="uk-nav-divider"></li>
            <li>
              <NavLink onClick={firebase.doSignOut}>Sign out</NavLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </>
);

const GuestNav = () => (
  <ul className="uk-navbar-nav">
    <li>
      <NavLink exact activeClassName="active" to={ROUTES.LANDING}>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink activeClassName="active" to={ROUTES.ABOUT}>
        About
      </NavLink>
    </li>
    <li>
      <NavLink to={ROUTES.CONTACT}>Contact</NavLink>
    </li>
    <li>
      <NavLink activeClassName="active" to={ROUTES.SIGNIN}>
        Sign In
      </NavLink>
    </li>
  </ul>
);
class Navigation extends Component {
  state = { user: {}, loading: true };

  componentDidMount() {
    const { firebase } = this.props;

    firebase.user(firebase.auth.currentUser.uid).on("value", snapshot => {
      this.setState({ user: snapshot.val(), loading: false });
    });
  }

  componentWillUnmount() {
    const { firebase } = this.props;
    firebase.user().off();
  }
  render() {
    const { firebase } = this.props;
    const { user } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => {
          return (
            <nav className="bg-primary" uk-navbar="true">
              <a href="/" className="uk-navbar-item uk-logo">
                Logo
              </a>
              <div className="uk-navbar-right">
                {authUser ? (
                  <UserNav user={user} firebase={firebase} />
                ) : (
                  <GuestNav />
                )}
              </div>
            </nav>
          );
        }}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Navigation);
