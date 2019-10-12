import React, { Component } from "react";
import { compose } from "recompose";
// import { withFirebase } from "../../components/Firebase";
import { withAuthorization } from "../../components/Session";
import * as ROLES from "../../constants/roles";

class AdminPage extends Component {
  render() {
    return <div></div>;
  }
}

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withAuthorization(condition)
  //   withFirebase
)(AdminPage);
