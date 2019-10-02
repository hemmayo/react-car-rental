import React, { Component } from "react";
import { withFirebase } from "../../../components/Firebase";
import Car from "../../../components/Car";

class Step5 extends Component {
  state = { cars: null, selectedCar: null, loading: true };

  componentDidMount() {
    const { firebase } = this.props;
    firebase.auth.currentUser &&
      firebase.cars().on("value", snapshot => {
        const carsObject = snapshot.val();
        if (carsObject) {
          const carsList = Object.keys(carsObject).map(key => ({
            ...carsObject[key],
            uid: key
          }));
          this.setState({
            cars: carsList,
            loading: false
          });
        } else {
          this.setState({ cars: null, loading: false });
        }
      });
  }

  selectCar = uid => {
    this.setState({ selectedCar: uid });
    this.props.editState("carId", uid);
  };

  render() {
    const { currentStep } = this.props;
    const { cars, selectedCar } = this.state;

    if (currentStep !== 5) {
      // Prop: The current step
      return null;
    }

    return !this.state.loading ? (
      <div className="self-start text-left">
        <h1 className="text-xl font-semibold text-primary my-8">Select Car:</h1>
        <div className="grid grid-col-2 grid-gap md:grid-col-4">
          {this.state.cars.map(car => (
            <Car
              key={car.uid}
              {...car}
              selectCar={this.selectCar}
              selected={selectedCar === car.uid}
            />
          ))}
        </div>
      </div>
    ) : (
      <div uk-spinner=""></div>
    );
  }
}

export default withFirebase(Step5);
