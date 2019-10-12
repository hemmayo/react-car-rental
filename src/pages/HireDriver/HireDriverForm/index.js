import React, { Component } from "react";
import SimpleStorage from "react-simple-storage";
import moment from "moment";
import { withFirebase } from "../../../components/Firebase";
import { withRouter } from "react-router-dom";
import { getPrice } from "../../../helpers";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Alert from "../../../components/Alert";

const INITIAL_STATE = {
  currentStep: 1,
  pickup: "",
  pickupDate: {},
  dropoffDate: {},
  driverId: "",
  driverRate: "",
  error: null
};

class BookRideBase extends Component {
  state = {
    ...INITIAL_STATE
  };

  static defaultProps = {
    numberOfSteps: 3
  };

  _next = () => {
    const { pickup, pickupDate, currentStep, driverId } = this.state;

    let canMove = false;
    let errorMessage;

    switch (currentStep) {
      case 1:
        canMove = pickup.length > 0;
        errorMessage = "Choose your nearest centre!";
        break;
      case 2:
        canMove = pickupDate.length > 0;
        errorMessage = "We'd love to know how long you'll need the driver.";
        break;
      case 3:
        canMove = driverId.length > 0;
        errorMessage = "Choose a driver!";
        break;
      default:
        canMove = currentStep > 4 && currentStep <= this.props.numberOfSteps;
    }

    canMove
      ? this.setState(st => ({
          currentStep:
            st.currentStep + 1 <= this.props.numberOfSteps
              ? st.currentStep + 1
              : st.currentStep
        }))
      : (() => {
          this.setState({
            error: {
              type: "warning",
              message:
                errorMessage || "You can't proceed until you complete the form!"
            }
          });
          setTimeout(() => this.setState({ error: null }), 2500);
        })();
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
    // If the current step is less than 7, then render the "next" button
    if (currentStep < this.props.numberOfSteps) {
      return (
        <span
          onClick={this._next}
          className="rounded-full uk-button uk-button-default p-2 cursor-pointer"
          uk-icon="icon: arrow-right; ratio: 1.5"
          title="Next"
        ></span>
      );
    } else {
      return (
        <span
          onClick={this.handleSubmit}
          className="rounded-full uk-button uk-button-default p-2 cursor-pointer"
          uk-icon="icon: check; ratio: 1.5"
          title="Finish"
        ></span>
      );
    }
  }

  handleSubmit = evt => {
    evt.preventDefault();
    const {
      pickup,
      pickupDate,
      dropoffDate,
      currentStep,
      driverId,
      driverRate,
      error
    } = this.state;

    if (currentStep < this.props.numberOfSteps) {
      this._next();
    } else {
      if (
        pickup &&
        driverId &&
        error === null &&
        pickupDate.length > 0 &&
        dropoffDate.length > 0 &&
        currentStep === this.props.numberOfSteps
      ) {
        const price = getPrice(driverRate, pickupDate, dropoffDate);
        this.props.firebase
          .orders()
          .push({
            pickup,
            dropoff: pickup,
            pickupDate,
            dropoffDate,
            driverId: driverId,
            price,
            userId: this.props.firebase.auth.currentUser.uid,
            status: "not_paid"
          })
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push("/orders");
          })
          .catch(err => {
            this.setState({
              currentStep: 1,
              error: {
                type: "warning",
                message: err.message
              }
            });
            setTimeout(() => this.setState({ error: null }), 2500);
          });
      } else {
        this.setState({
          currentStep: 1,
          error: {
            type: "warning",
            message: "Please ensure that you fill the form."
          }
        });
        setTimeout(() => this.setState({ error: null }), 2500);
      }
    }
  };

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  editState = (name, value) => {
    this.setState({ [name]: value });
  };

  onDatesChange = ({ startDate, endDate }) => {
    startDate &&
      this.setState({
        pickupDate: moment(startDate).format()
      });
    endDate && this.setState({ dropoffDate: moment(endDate).format() });
  };
  render() {
    return (
      <React.Fragment>
        <form
          className="relative flex flex-col text-center items-center w-full"
          onSubmit={this.handleSubmit}
        >
          <SimpleStorage parent={this} prefix={"HireDriverComponent"} />

          <Step1
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            pickup={this.state.pickup}
            authUser={this.props.authUser}
          />

          <Step2
            currentStep={this.state.currentStep}
            onDatesChange={this.onDatesChange}
            pickupDate={this.state.pickupDate}
            dropoffDate={this.state.dropoffDate}
          />

          <Step3
            currentStep={this.state.currentStep}
            editState={this.editState}
            selectedDriver={this.state.driverId}
          />

          {this.state.error && <Alert {...this.state.error} />}

          <div className="uk-button-group my-4">
            {this.previousButton}
            {this.nextButton}
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default withRouter(withFirebase(BookRideBase));
