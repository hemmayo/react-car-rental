import React, { Component } from "react";
import { withFirebase } from "../../../components/Firebase";
import Driver from "../../../components/Driver";

class Step3 extends Component {
  state = { drivers: null, selectedDriver: null, loading: true };

  componentDidMount() {
    const { firebase } = this.props;
    firebase.auth.currentUser &&
      firebase.drivers().on("value", snapshot => {
        const driversObject = snapshot.val();
        if (driversObject) {
          const driversList = Object.keys(driversObject).map(key => ({
            ...driversObject[key],
            uid: key
          }));
          this.setState({
            drivers: driversList.filter(d => d.isAvailable),
            selectedDriver: this.props.selectedDriver,
            loading: false
          });
        } else {
          this.setState({ drivers: null, loading: false });
        }
      });
  }

  selectDriver = (uid, rate) => {
    this.setState({ selectedDriver: uid });
    this.props.editState("driverId", uid);
    this.props.editState("driverRate", rate);
  };

  render() {
    const { currentStep } = this.props;
    const { loading, drivers, selectedDriver } = this.state;

    if (currentStep !== 3) {
      // Prop: The current step
      return null;
    }

    return !loading ? (
      <div className="w-full text-left">
        <h1 className="text-xl font-semibold text-primary mt-8 mb-2">
          Select Driver
        </h1>
        {drivers.length > 0 ? (
          <div className="grid grid-col-2 grid-gap md:grid-col-5">
            {drivers.map(driver => (
              <Driver
                key={driver.uid}
                {...driver}
                selectDriver={this.selectDriver}
                selected={selectedDriver === driver.uid}
              />
            ))}
          </div>
        ) : (
          <div className="uk-card uk-card-default rounded shadow p-4">
            Our drivers are unavailable at the moment. Please wait or skip this
            step.
          </div>
        )}
      </div>
    ) : (
      <div uk-spinner=""></div>
    );
  }
}

export default withFirebase(Step3);
