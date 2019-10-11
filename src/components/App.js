import React, { Component } from "react";

import LandingPage from "../pages/Landing";
import SignUpPage from "../pages/SignUp";
import SignInPage from "../pages/SignIn";
import SignOutPage from "../pages/SignOut";
import PasswordForgetPage from "../pages/PasswordForget";
import DashboardPage from "../pages/Dashboard";
import AboutPage from "../pages/About";
import ContactPage from "../pages/Contact";
import HireDriverPage from "../pages/HireDriver";
import BookRidePage from "../pages/BookRide";
import ProfilePage from "../pages/Profile";
import OrdersPage from "../pages/Orders";
import PasswordChangePage from "../pages/PasswordChange";

import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { withAuthentication } from "./Session";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGNUP} component={SignUpPage} />
        <Route path={ROUTES.SIGNIN} component={SignInPage} />
        <Route path={ROUTES.SIGNOUT} component={SignOutPage} />
        <Route path={ROUTES.PASSWORDFORGET} component={PasswordForgetPage} />
        <Route
          path={ROUTES.DASHBOARD}
          render={props => <DashboardPage {...props} {...this.props} />}
        />
        <Route path={ROUTES.ABOUT} component={AboutPage} />
        <Route path={ROUTES.CONTACT} component={ContactPage} />
        <Route
          path={ROUTES.HIREDRIVER}
          render={props => <HireDriverPage {...props} {...this.props} />}
        />
        <Route
          path={ROUTES.BOOKRIDE}
          render={props => <BookRidePage {...props} {...this.props} />}
        />
        <Route
          path={ROUTES.ORDERS}
          render={props => <OrdersPage {...props} {...this.props} />}
        />
        <Route
          path={ROUTES.SETTINGS}
          render={props => <ProfilePage {...props} {...this.props} />}
        />
        <Route
          path={ROUTES.PROFILE}
          render={props => <ProfilePage {...props} {...this.props} />}
        />
        <Route
          path={ROUTES.PASSWORDCHANGE}
          render={props => <PasswordChangePage {...props} {...this.props} />}
        />
      </Router>
    );
  }
}

export default withAuthentication(App);
