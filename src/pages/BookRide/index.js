import React, { Component } from "react";

import Layout from "../../components/Layout";
import { withAuthorization } from "../../components/Session";
import BookRideBase from "./Form";

class BookRide extends Component {
  state = {};

  render() {
    const { authUser } = this.props;

    return (
      <Layout>
        <div className="w-full">
          <BookRideBase authUser={authUser} />
        </div>
      </Layout>
    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(BookRide);
