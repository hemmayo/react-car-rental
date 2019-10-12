import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import Layout from "../../components/Layout";
import { withAuthorization } from "../../components/Session";

class Dashboard extends Component {
  render() {
    return (
      <Layout>
        <div className="font-sans text-center my-4">
          <h1 className="text-3xl font-bold my-2">
            Hi, {this.props.authUser.username}!
          </h1>
          <h1 className="text-xl">What would you like to do today?</h1>
        </div>
        <div className="flex flex-col items-center">
          <Link to={ROUTES.BOOKRIDE}>Book a Ride</Link>
          <Link to={ROUTES.HIREDRIVER}>Hire a Driver</Link>
          <Link to={ROUTES.ORDERS}>View Orders</Link>
        </div>
      </Layout>
    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Dashboard);
