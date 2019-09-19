import React, { Component } from "react";
import { withFirebase } from "../Firebase";

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

    this.setState({ error: null });

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
    const isInvalid = email === "" || password === "";

    return (
      <form onSubmit={this.handleSubmit}>
        <h1 className="text-3xl font-bold mb-4">Log in</h1>
        <div className="pb-4">
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
          <button
            className={`bg-blue-${isInvalid ? "3" : "5"}00 hover:bg-blue-${
              isInvalid ? "4" : "7"
            }00 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            type="submit"
            disabled={isInvalid}
          >
            Sign In
          </button>
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

export default withFirebase(SignInForm);
