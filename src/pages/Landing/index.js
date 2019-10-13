import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import Layout from "../../components/Layout";

export default function Landing() {
  return (
    <Layout type="no-center">
      <div className="uk-container uk-container-large">
        <div className="rounded-lg uk-position-relative uk-section uk-section-small flex flex-col justify-between items-center text-center mt-3 bg-gray-100">
          <img
            src="http://pluspng.com/img-png/mercedes-png-mercedes-png-image-503.png"
            alt="hero"
            className="uk-width-large mb-4"
          />
          <div>
            <h1 className="text-4xl mb-6 font-semibold">
              Experience the drive of <br></br>your life
            </h1>
            <Link
              to={ROUTES.SIGNIN}
              className="uk-button uk-button-default uk-button-large rounded"
            >
              Get started
            </Link>
          </div>
        </div>
        <div className="uk-section uk-section-small">
          <div class="uk-child-width-1-3@s uk-margin" uk-grid="">
            <div>
              <div class="uk-card uk-card-default uk-card-body shadow rounded-lg ">
                <h3 class="text-xl mb-2 font-semibold">Easy Online Booking</h3>
                <p>
                  Lorem ipsum color sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
            <div>
              <div class="uk-card uk-card-default uk-card-body shadow rounded-lg ">
                <h3 class="text-xl mb-2 font-semibold">
                  Variety of Car Brands
                </h3>
                <p>
                  Lorem ipsum color sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
            <div>
              <div class="uk-card uk-card-default uk-card-body shadow rounded-lg ">
                <h3 class="text-xl mb-2 font-semibold">Online Payment</h3>
                <p>
                  Lorem ipsum color sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
