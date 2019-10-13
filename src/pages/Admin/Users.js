import React, { Component } from "react";

import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../../components/Firebase";
import { snapshotToArray } from "../../helpers";

class Users extends Component {
  state = {
    users: null,
    loading: true
  };

  componentDidMount() {
    const { firebase } = this.props;
    firebase.users().on("value", snapshot => {
      const users = snapshotToArray(snapshot.val()).reverse();
      this.setState({ users, loading: false });
    });
  }

  componentWillUnmount() {
    const { firebase } = this.props;
    firebase.users().off();
  }

  render() {
    const { route } = this.props;
    const { users, loading } = this.state;
    const shouldRender = route === ROUTES.ADMIN.USERS;

    return (
      shouldRender &&
      (!loading ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="uk-heading-bullet text-xl md:text-xl">List Users</h1>
          </div>
          <table className="uk-table uk-table-middle uk-table-responsive uk-table-divider text-center md:text-left">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th>BVN</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map(user => {
                  return (
                    <tr key={user.uid}>
                      <td>{user.username || "Not set"}</td>
                      <td>{user.address || "Not set"}</td>
                      <td>{user.phone || "Not set"}</td>
                      <td>{user.email}</td>
                      <td>{user.bvn || "Not set"}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      ) : (
        <div uk-spinner="true"></div>
      ))
    );
  }
}

export default withFirebase(Users);
