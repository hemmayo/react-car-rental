import React, { Component } from "react";
import SignUpForm from "../../components/Auth/SignUpForm";
import Layout from "../../components/Layout";

export default class SignUp extends Component {
  render() {
    return (
      <Layout>
        <div className="my-4" style={{ maxWidth: "25rem", width: "100%" }}>
          <SignUpForm />
        </div>
      </Layout>
    );
  }
}
