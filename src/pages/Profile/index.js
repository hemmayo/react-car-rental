import React, { Component } from "react";
import { withAuthorization } from "../../components/Session";
import Layout from "../../components/Layout";
import Alert from "../../components/Alert";

const INITIAL_STATE = {
  email: "",
  username: "",
  phone: "",
  bvn: "",
  address: "",
  error: null
};

class Profile extends Component {
  state = {
    ...INITIAL_STATE
  };

  componentDidMount() {
    const { firebase } = this.props;
    firebase.user(firebase.auth.currentUser.uid).on("value", snapshot => {
      const user = snapshot.val();
      this.setState({ ...user });
    });
  }

  componentWillUnmount() {
    this.props.firebase.user().off();
  }

  onChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onUpdate = evt => {
    evt.preventDefault();
    const { firebase } = this.props;
    const { email, username, phone, bvn, address } = this.state;
    const user = {
      email,
      username,
      phone,
      bvn,
      address
    };

    firebase
      .user(firebase.auth.currentUser.uid)
      .set({
        ...user
      })
      .then(() => {
        this.setState({
          error: {
            type: "success",
            message: "Profile updated!"
          }
        });
        setTimeout(() => this.setState({ error: null }), 2500);
      })
      .catch(error => {
        error.type = "warning";
        this.setState({ error });
      });
  };

  render() {
    const { email, username, phone, bvn, address, error } = this.state;
    const isInvalid = !email || !username || !phone || !address;

    return (
      <Layout type="no-center">
        <div className="w-full py-2">
          <h1 className="uk-heading-bullet text-xl md:text-2xl">
            Your Profile
          </h1>
          <div className="py-6 w-full md:w-1/2">
            <form
              onSubmit={this.onUpdate}
              className="uk-form-stacked uk-grid-small"
              uk-grid=""
            >
              <div className="uk-width-1-2@s">
                <label className="uk-form-label text-base" for="email">
                  Email
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input"
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    placeholder="you@example.com"
                    disabled="disabled"
                  />
                </div>
              </div>
              <div className="uk-width-1-2@s">
                <label className="uk-form-label text-base" for="username">
                  Name
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input"
                    id="username"
                    name="username"
                    type="text"
                    onChange={this.onChange}
                    value={username}
                    placeholder="Your name"
                  />
                </div>
              </div>
              <div className="uk-width-1-2@s">
                <label className="uk-form-label text-base" for="phone">
                  Phone number
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input"
                    id="phone"
                    name="phone"
                    type="tel"
                    onChange={this.onChange}
                    value={phone}
                    placeholder="Phone number"
                  />
                </div>
              </div>
              <div className="uk-width-1-2@s">
                <label className="uk-form-label text-base" for="bvn">
                  BVN
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input"
                    id="bvn"
                    name="bvn"
                    type="number"
                    onChange={this.onChange}
                    value={bvn}
                    placeholder="BVN"
                  />
                </div>
              </div>
              <div className="uk-width-1-1@s">
                <label className="uk-form-label text-base" for="address">
                  Address
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input"
                    id="address"
                    name="address"
                    type="text"
                    onChange={this.onChange}
                    value={address}
                    placeholder="Address"
                  />
                </div>
              </div>
              <div className="uk-width-1-1@s">
                <button
                  className={`bg-blue-${
                    isInvalid ? "3" : "5"
                  }00 hover:bg-blue-${
                    isInvalid ? "4" : "7"
                  }00 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                  disabled={isInvalid}
                  type="submit"
                >
                  Update profile
                </button>
                {error && <Alert {...error} />}
              </div>
            </form>
          </div>
        </div>
      </Layout>
    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Profile);
