import React, { Component } from "react";

import Layout from "../../components/Layout";
import { withAuthorization } from "../../components/Session";
import BookRideBase from "./Form";
import MiniBar from "./MiniBar";

class BookRide extends Component {
  state = {};

  render() {
    const { me } = this.props;

    return (
      <Layout>
        <div className="w-full">
          <BookRideBase me={me} />
        </div>
      </Layout>
    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(BookRide);
