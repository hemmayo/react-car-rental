import React, { Component } from "react";
import { withAuthorization } from "../../components/Session";

class BookRide extends Component {
  render() {
    return <div>Hello</div>;
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(BookRide);
