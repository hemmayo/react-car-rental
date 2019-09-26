import React, { Component } from "react";
import SimpleStorage from "react-simple-storage";
import moment from "moment";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

export default class BookRideBase extends Component {
  state = {
    currentStep: 1,
    pickup: "",
    dropoff: "",
    pickupDate: {},
    dropoffDate: {},
    age: ""
  };

  _next = () => {
    let currentStep = this.state.currentStep;
    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep + 1 < 6 ? currentStep + 1 : currentStep;
    this.setState({
      currentStep: currentStep
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
  };

  get previousButton() {
    let currentStep = this.state.currentStep;
    // If the current step is not 1, then render the "previous" button
    if (currentStep !== 1) {
      return (
        <span
          onClick={this._prev}
          className="rounded-full uk-button uk-button-default p-2 cursor-pointer uk-margin-small-right"
          uk-icon="icon: arrow-left; ratio: 1.5"
          title="Go back"
        ></span>
      );
    }
    // ...else return nothing
    return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    // If the current step is not 3, then render the "next" button
    if (currentStep < 5) {
      return (
        <span
          onClick={this._next}
          className="rounded-full uk-button uk-button-default p-2 cursor-pointer"
          uk-icon="icon: arrow-right; ratio: 1.5"
          title="Next"
        ></span>
      );
    }
    // ...else render nothing
    return null;
  }

  handleSubmit = evt => {
    evt.preventDefault();
    const { currentStep } = this.state;
    const newStep = currentStep + 1;
    if (newStep < 6) {
      this.setState({ currentStep: newStep });
    }
  };

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  editState = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form
        className="relative flex flex-col text-center items-center w-full"
        onSubmit={this.handleSubmit}
      >
        <SimpleStorage parent={this} />
        <Step1
          currentStep={this.state.currentStep}
          handleChange={this.handleChange}
          pickup={this.state.pickup}
          me={this.props.me}
        />
        <Step2
          currentStep={this.state.currentStep}
          handleChange={this.handleChange}
          editState={this.editState}
          dropoff={this.state.dropoff}
          pickup={this.state.pickup}
        />
        <Step3
          currentStep={this.state.currentStep}
          handleChange={this.handleChange}
          pickupDate={this.state.pickupDate}
          dropoffDate={this.state.dropoffDate}
        />
        <Step4
          currentStep={this.state.currentStep}
          editState={this.editState}
          age={this.state.age}
        />
        <div class="uk-button-group my-4">
          {this.previousButton}
          {this.nextButton}
        </div>
      </form>
    );
  }
}
