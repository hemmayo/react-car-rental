import React, { Component } from "react";
import { compose } from "recompose";

import Layout from "../../components/Layout";
import { withFirebase } from "../../components/Firebase";
import { withAuthorization } from "../../components/Session";

class SignOut extends Component {
  componentDidMount() {
    this.props.firebase.doSignOut();
  }
  render() {
    return (
      <Layout>
        <h1 className="text-3xl">You've signed out!</h1>
      </Layout>
    );
  }
}

const condition = authUser => !!authUser;
export default compose(
  withAuthorization(condition),
  withFirebase
)(SignOut);
