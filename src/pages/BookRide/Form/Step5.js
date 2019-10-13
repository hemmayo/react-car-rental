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
            cars: carsList.filter(d => d.isAvailable),
            selectedCar: this.props.selectedCar,
            loading: false
          });
        } else {
          this.setState({ cars: null, loading: false });
        }
      });
  }

  componentWillUnmount() {
    this.props.firebase.cars().off();
  }

  selectCar = (uid, rate) => {
    this.setState({ selectedCar: uid });
    this.props.editState("carId", uid);
    this.props.editState("carRate", rate);
  };

  render() {
    const { currentStep } = this.props;
    const { cars, selectedCar, loading } = this.state;

    if (currentStep !== 5) {
      // Prop: The current step
      return null;
    }

    return !loading ? (
      <div className="w-full text-left">
        <h1 className="text-xl font-semibold text-primary my-8">Select Car:</h1>
        <div className="grid grid-col-2 grid-gap md:grid-col-4">
          {cars.map(car => (
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
