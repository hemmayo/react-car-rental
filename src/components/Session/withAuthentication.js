import React from "react";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";
import Loading from "../Loading";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    state = {
      authUser: null,
      loading: true
    };

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(authUser => {
        if (authUser) {
          this.setState({ authUser, loading: false });
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
      const { loading, authUser } = this.state;
      return (
        <AuthUserContext.Provider value={authUser}>
          {!loading ? (
            <Component authUser={authUser} {...this.props} />
          ) : (
            <Loading />
          )}
        </AuthUserContext.Provider>
      );
    }
  }
  return withFirebase(WithAuthentication);
};

export default withAuthentication;
