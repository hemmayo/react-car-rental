import React, { Component } from "react";
import { withAuthorization } from "../../components/Session";
import Layout from "../../components/Layout";
import Alert from "../../components/Alert";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { passwordOne } = this.state;
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({
          ...INITIAL_STATE,
          error: {
            type: "success",
            message: "Password changed!"
          }
        });
        setTimeout(() => this.setState({ error: null }), 2500);
      })
      .catch(error => {
        error.type = "warning";
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";
    return (
      <Layout type="no-center">
        <div className="w-full py-2">
          <h1 className="uk-heading-bullet text-xl md:text-2xl">
            Change Password
          </h1>
          <div className="py-6 w-full md:w-1/3">
            <form onSubmit={this.onSubmit}>
              <div className="uk-margin">
                <input
                  className="uk-input"
                  name="passwordOne"
                  value={passwordOne}
                  onChange={this.onChange}
                  type="password"
                  placeholder="New Password"
                />
              </div>
              <div className="uk-margin">
                <input
                  className="uk-input"
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Confirm New Password"
                />
              </div>

              <button
                className={`bg-blue-${isInvalid ? "3" : "5"}00 hover:bg-blue-${
                  isInvalid ? "4" : "7"
                }00 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                disabled={isInvalid}
                type="submit"
              >
                Change password
              </button>
              {error && <Alert {...error} />}
            </form>
          </div>
        </div>
      </Layout>
    );
  }
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(PasswordChangeForm);
