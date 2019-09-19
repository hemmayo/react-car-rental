import React, { Component } from "react";

import Navigation from "../Navigation";
import LandingPage from "../pages/Landing";
import SignUpPage from "../pages/SignUp";
import SignInPage from "../pages/SignIn";
import PasswordForgetPage from "../pages/PasswordForget";
import DashboardPage from "../pages/Dashboard";
import AboutPage from "../pages/About";
import ContactPage from "../pages/Contact";
import HireDriverPage from "../pages/HireDriver";
import BookRidePage from "../pages/BookRide";

import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGNUP} component={SignUpPage} />
        <Route path={ROUTES.SIGNIN} component={SignInPage} />
        <Route path={ROUTES.PASSWORDFORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.DASHBOARD} component={DashboardPage} />
        <Route path={ROUTES.ABOUT} component={AboutPage} />
        <Route path={ROUTES.CONTACT} component={ContactPage} />
        <Route path={ROUTES.HIREDRIVER} component={HireDriverPage} />
        <Route path={ROUTES.BOOKRIDE} component={BookRidePage} />
      </Router>
    );
  }
}
