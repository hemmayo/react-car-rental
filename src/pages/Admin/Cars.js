import React, { Component } from "react";
import Modal from "react-modal";
import moment from "moment";

import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../../components/Firebase";
import { snapshotToArray, numberWithCommas } from "../../helpers";
import Alert from "../../components/Alert";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

Modal.setAppElement("#root");

class Cars extends Component {
  state = {
    cars: null,
    loading: true,
    modalIsOpen: false,
    modalData: {},
    error: null
  };

  componentDidMount() {
    const { firebase } = this.props;
    firebase.cars().on("value", snapshot => {
      const cars = snapshotToArray(snapshot.val());
      this.setState({ cars, loading: false });
    });
  }

  componentWillUnmount() {
    const { firebase } = this.props;
    firebase.cars().off();
  }

  openModal = car => {
    this.setState({ modalIsOpen: true, modalData: car });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = "#f00";
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  onModalInputChange = evt => {
    const modalData = {
      ...this.state.modalData,
      [evt.target.name]: evt.target.value
    };
    this.setState({
      modalData
    });
  };

  onUpdate = evt => {
    evt.preventDefault();
    const { firebase } = this.props;
    const car = {
      ...this.state.modalData,
      lastUpdated: moment({}).format()
    };

    firebase
      .car(car.uid)
      .set({
        ...car
      })
      .then(() => {
        this.setState({
          error: {
            type: "success",
            message: "Car updated!"
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
    const { route } = this.props;
    const { cars, loading, modalData, modalIsOpen, error } = this.state;
    const {
      model,
      vehicleNumber,
      year,
      manufacturer,
      isAvailable,
      transmissionMode,
      rate,
      branch,
      noSeats
    } = modalData;
    const isInvalid =
      !model || !vehicleNumber || !year || !rate || !noSeats || !manufacturer;
    const shouldRender = route === ROUTES.ADMIN.CARS;

    return (
      shouldRender &&
      (!loading ? (
        <>
          <h1 className="uk-heading-bullet text-xl md:text-xl">Manage Cars</h1>
          <table className="uk-table uk-table-middle uk-table-responsive uk-table-divider text-center md:text-left">
            <thead>
              <tr>
                <th>Car</th>
                <th>Vehicle Number</th>
                <th>Transmission Mode</th>
                <th>Rate</th>
                <th>Branch</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {cars &&
                cars.map(car => {
                  const carName =
                    car.manufacturer + ` ` + car.model + " " + car.year;

                  return (
                    <tr key={car.uid}>
                      <td>
                        <div className="flex flex-col md:flex-row items-center md:items-start">
                          <img
                            className="w-1/2 md:w-24 mr-0 mb-4 md:mb-0 md:mr-4"
                            alt={carName}
                            src={car.image}
                          />
                          <div className="flex flex-col justify-center">
                            <span className="text-lg md:text-base">
                              {carName}
                            </span>
                            <span className="text-sm uk-text-lead">
                              {car.noSeats} seats
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>{car.vehicleNumber.toUpperCase()}</td>
                      <td>{car.transmissionMode}</td>
                      <td>&#8358;{numberWithCommas(car.rate)}/hr</td>
                      <td>{car.branch}</td>
                      <td>
                        <span
                          className={`uk-badge uk-padding-small ${
                            car.isAvailable
                              ? "bg-teal-500"
                              : "bg-gray-300 text-gray-700 hover:text-gray-700"
                          }`}
                        >
                          {car.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => this.openModal(car)}
                          className="uk-button uk-button-default rounded"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Edit Car"
            >
              <div className="uk-width-xlarge@s flex flex-col justify-between h-screen md:h-auto ">
                <div className="flex justify-between mb-4">
                  <h1 className="uk-heading-bullet text-lg font-bold">
                    Edit Car
                  </h1>
                  <span
                    className="cursor-pointer"
                    uk-icon="icon: close"
                    onClick={this.closeModal}
                  ></span>
                </div>
                <div className="flex flex-1">
                  <form
                    onSubmit={this.onUpdate}
                    className="uk-form-stacked uk-grid-small"
                    uk-grid=""
                  >
                    <div className="uk-width-1-2@s">
                      <label
                        className="uk-form-label text-base"
                        htmlFor="manufacturer"
                      >
                        Manufacturer
                      </label>
                      <div className="uk-form-controls">
                        <input
                          className="uk-input"
                          id="manufacturer"
                          name="manufacturer"
                          type="text"
                          value={manufacturer}
                          onChange={this.onModalInputChange}
                          placeholder="Manufacturer"
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="uk-width-1-4@s">
                      <label
                        className="uk-form-label text-base"
                        htmlFor="model"
                      >
                        Model
                      </label>
                      <div className="uk-form-controls">
                        <input
                          className="uk-input"
                          id="model"
                          name="model"
                          type="text"
                          onChange={this.onModalInputChange}
                          value={model}
                          placeholder="Model"
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="uk-width-1-4@s">
                      <label className="uk-form-label text-base" htmlFor="year">
                        Year
                      </label>
                      <div className="uk-form-controls">
                        <input
                          className="uk-input"
                          id="year"
                          name="year"
                          type="number"
                          max={new Date().getFullYear()}
                          onChange={this.onModalInputChange}
                          value={year}
                          placeholder="Year"
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="uk-width-1-2@s">
                      <label
                        className="uk-form-label text-base"
                        htmlFor="vehicleNumber"
                      >
                        Vehicle Number
                      </label>
                      <div className="uk-form-controls">
                        <input
                          className="uk-input"
                          id="vehicleNumber"
                          name="vehicleNumber"
                          type="text"
                          onChange={this.onModalInputChange}
                          value={vehicleNumber}
                          placeholder="Vehicle Number"
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="uk-width-1-2@s">
                      <label
                        className="uk-form-label text-base"
                        htmlFor="transmissionMode"
                      >
                        Transmission Mode
                      </label>
                      <div className="uk-form-controls">
                        <select
                          className="uk-select"
                          id="transmissionMode"
                          name="transmissionMode"
                          type="text"
                          onChange={this.onModalInputChange}
                          value={transmissionMode}
                          required={true}
                        >
                          <option>Manual</option>
                          <option>Automatic</option>
                        </select>
                      </div>
                    </div>
                    <div className="uk-width-1-4@s">
                      <label
                        className="uk-form-label text-base"
                        htmlFor="noSeats"
                      >
                        No. of Seats
                      </label>
                      <div className="uk-form-controls">
                        <input
                          className="uk-input"
                          id="noSeats"
                          name="noSeats"
                          type="number"
                          min="2"
                          onChange={this.onModalInputChange}
                          value={noSeats}
                          placeholder="No. of Seats"
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="uk-width-1-4@s">
                      <label className="uk-form-label text-base" htmlFor="rate">
                        Rate
                      </label>
                      <div className="uk-form-controls">
                        <input
                          className="uk-input"
                          id="rate"
                          name="rate"
                          type="number"
                          min="20"
                          onChange={this.onModalInputChange}
                          value={rate}
                          placeholder="Rate"
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="uk-width-1-2@s">
                      <label
                        className="uk-form-label text-base"
                        htmlFor="branch"
                      >
                        Branch
                      </label>
                      <div className="uk-form-controls">
                        <select
                          className="uk-select"
                          id="branch"
                          name="branch"
                          onChange={this.onModalInputChange}
                          value={branch}
                          required={true}
                        >
                          <option>Ikeja</option>
                        </select>
                      </div>
                    </div>

                    <div className="uk-width-1-1@s">
                      {error && <Alert {...error} />}

                      <button
                        className={`uk-button uk-button-${
                          isInvalid ? "disabled" : "default"
                        } rounded`}
                        disabled={isInvalid}
                        type="submit"
                      >
                        Update Car
                      </button>
                    </div>
                  </form>
                </div>
                <div className="flex"></div>
              </div>
            </Modal>
          </table>
        </>
      ) : (
        <div uk-spinner="true"></div>
      ))
    );
  }
}

export default withFirebase(Cars);
