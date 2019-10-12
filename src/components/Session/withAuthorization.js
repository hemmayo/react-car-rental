import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import AuthUserContext from "./context";
import * as ROUTES from "../../constants/routes";

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(authUser => {
        if (condition(authUser)) {
          const { pathname } = this.props.location;
          if (pathname === ROUTES.SIGNIN || pathname === ROUTES.SIGNUP) {
            this.props.history.push(ROUTES.DASHBOARD);
          }
        } else {
          this.props.history.push(ROUTES.SIGNIN);
        }
      });
    }
    componentWillUnmount() {
      this.listener();
    }
    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }
  return compose(
    withRouter,
    withFirebase
  )(WithAuthorization);
};
export default withAuthorization;
