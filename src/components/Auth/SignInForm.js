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
        <Input
          placeholder="E-mail address"
          prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
          value={email}
          type="email"
          name="email"
          onChange={this.handleChange}
        />

        <Input
          placeholder="Password"
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          value={password}
          name="password"
          type="password"
          onChange={this.handleChange}
        />

        <Button type="primary" onClick={this.handleSubmit}>
          Log in
        </Button>
        {error && <Alert message={error.message} type="error" />}
      </form>
    );
  }
}

export default withFirebase(SignInForm);
