import React, { Component } from "react";
import Layout from "../../components/Layout";
import { withAuthorization } from "../../components/Session";

class Dashboard extends Component {
  render() {
    return (
      <Layout>
        <h1>Hello world</h1>
      </Layout>
    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Dashboard);
