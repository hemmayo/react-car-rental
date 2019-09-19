import React, { Component } from "react";

import Layout from "../../components/Layout";
import { withAuthorization } from "../../components/Session";

import Icon from "./icon.svg";

class BookRide extends Component {
  render() {
    return (
      <Layout>
        <div className="flex flex-col text-center items-center">
          <img
            className="my-2"
            src="https://img.icons8.com/cotton/128/000000/pickup-point.png"
            width={120}
            height={120}
          />
          <div className="my-4">
            <h1 className="text-3xl font-bold mb-2">Hi, Emmanuel!</h1>
            <h1 className="text-xl">What's your pick-up location?</h1>
          </div>
          <div className="my-2">
            <form>
              <div class="uk-margin">
                <div class="uk-inline">
                  <a
                    class="uk-form-icon uk-form-icon-flip"
                    href="#"
                    uk-icon="icon: arrow-right"
                  ></a>
                  <input
                    class="uk-input uk-form-width-large uk-form-large rounded"
                    type="text"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(BookRide);
