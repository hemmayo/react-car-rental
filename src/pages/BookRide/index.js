import React, { Component } from "react";

import Layout from "../../components/Layout";
import { withAuthorization } from "../../components/Session";
import BookRideBase from "./Form";

class BookRide extends Component {
  state = {
    me: {},
    loading: true
  };

  componentDidMount() {
    this.props.firebase.user(this.props.me.uid).on("value", snapshot => {
      this.setState({ me: snapshot.val(), loading: false });
    });
  }

  componentWillUnmount() {
    this.props.firebase.user().off();
  }

  render() {
    const { me, loading } = this.state;
    console.log(this.state.me);

    return (
      <Layout>
        <div className="w-full">{!loading && <BookRideBase me={me} />}</div>
      </Layout>
    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(BookRide);
