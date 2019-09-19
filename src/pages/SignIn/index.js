import React, { Component } from "react";
import SignInForm from "../../components/Auth/SignInForm";
import Layout from "../../components/Layout";

export default class SignIn extends Component {
  render() {
    return (
      <Layout>
        <div style={{ maxWidth: "25rem", width: "100%" }}>
          <SignInForm />
        </div>
      </Layout>
    );
  }
}
