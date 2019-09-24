import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: null
};

class SignUpForm extends Component {
  state = { ...INITIAL_STATE };

  handleSubmit = evt => {
    evt.preventDefault();
    const { email, password, username } = this.state;

    this.setState({ error: null });

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email
        });
      })
      .then(() => {
        this.props.history.push(ROUTES.DASHBOARD);
      })
      .catch(e => this.setState({ error: e }));
  };

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    const { username, email, password, confirmPassword, error } = this.state;
    const isInvalid =
      username === "" ||
      email === "" ||
      password === "" ||
      password !== confirmPassword;

    return (
      <form onSubmit={this.handleSubmit}>
        <h1 className="text-3xl font-bold mb-4">Create an account</h1>
        <div className="pb-4">
          <label htmlFor="email" className="text-sm block font-bold pb-2">
            Your Name
          </label>
          <input
            type="text"
            name="username"
            onChange={this.handleChange}
            value={username}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
            placeholder="e.g John Khalid"
          />
        </div>
        <div className="pb-4">
          <label htmlFor="email" className="text-sm block font-bold pb-2">
            E-mail Address
          </label>
          <input
            type="email"
            name="email"
            onChange={this.handleChange}
            value={email}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
            placeholder="you@example.com"
          />
        </div>
        <div className="pb-4">
          <label htmlFor="password" className="text-sm block font-bold pb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            value={password}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
            placeholder="Enter your password"
          />
        </div>
        <div className="pb-4">
          <label htmlFor="password" className="text-sm block font-bold pb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            onChange={this.handleChange}
            value={confirmPassword}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
            placeholder="Re-enter password"
          />
        </div>

        <div className="flex justify-between items-center pb-4">
          <button
            className={`bg-blue-${isInvalid ? "3" : "5"}00 hover:bg-blue-${
              isInvalid ? "4" : "7"
            }00 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            type="submit"
            disabled={isInvalid}
          >
            Sign Up
          </button>
          <p>
            Have an account? <Link to={ROUTES.SIGNIN}>Sign in</Link>
          </p>
        </div>

        {error && (
          <div className="uk-alert uk-alert-danger" uk-alert="true">
            <p>{error.message}</p>
          </div>
        )}
      </form>
    );
  }
}

export default withRouter(withFirebase(SignUpForm));
