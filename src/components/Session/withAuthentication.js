import React from "react";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    state = {
      authUser: null,
      me: null,
      loading: true
    };

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          this.setState({ authUser });
          this.props.firebase
            .user(this.state.authUser.uid)
            .on("value", snapshot => {
              this.setState({ authUser, me: snapshot.val(), loading: false });
            });
        } else {
          this.setState({ authUser: null, loading: false });
        }
      });
    }

    componentWillUnmount() {
      this.listener();
      this.props.firebase.user().off();
    }

    render() {
      const { loading } = this.state;
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          {!loading && <Component me={this.state.me} {...this.props} />}
        </AuthUserContext.Provider>
      );
    }
  }
  return withFirebase(WithAuthentication);
};

export default withAuthentication;
