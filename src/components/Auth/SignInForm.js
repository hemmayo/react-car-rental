import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { Input, Button, Icon, Alert } from "antd";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInForm extends Component {
  state = { ...INITIAL_STATE };

  handleSubmit = evt => {
    evt.preventDefault();
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log(authUser);
      })
      .catch(e => this.setState({ error: e }));
  };

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="px-4 pb-4">
          <label htmlFor="email" className="text-sm block font-bold  pb-2">
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
        <div className="px-4 pb-4">
          <label htmlFor="password" className="text-sm block font-bold pb-2">
            PASSWORD
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
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign In
          </button>
        </div>
        {error && <Alert message={error.message} type="error" />}
      </form>
    );
  }
}

export default withFirebase(SignInForm);
