import React, { Component } from "react";
import { compose } from "recompose";
import { withAuthorization } from "../../components/Session";
import * as ROLES from "../../constants/roles";
import Layout from "../../components/Layout";

import AdminNav from "./AdminNav";
import Cars from "./Cars";
import Drivers from "./Drivers";

class AdminPage extends Component {
  render() {
    const { history } = this.props;
    const pathname = history.location.pathname;

    return (
      <Layout type="no-center">
        <AdminNav />
        <div className="py-6">
          <Cars route={pathname} />
          <Drivers route={pathname} />
        </div>
      </Layout>
    );
  }
}

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withAuthorization(condition)
  //   withFirebase
)(AdminPage);
