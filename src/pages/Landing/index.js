import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

export default class Landing extends Component {
  render() {
    return (
      <div className="font-sans">
        <h1>Landing Page</h1>
        <Link to={ROUTES.SIGNIN}>Sign In</Link>
      </div>
    );
  }
}
