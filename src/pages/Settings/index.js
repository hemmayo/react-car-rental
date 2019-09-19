import React, { Component } from "react";
import { withAuthorization } from "../../components/Session";

class Settings extends Component {
  render() {
    return <div></div>;
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Settings);
