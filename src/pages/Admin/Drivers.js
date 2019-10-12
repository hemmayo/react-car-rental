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

class Drivers extends Component {
  state = {
    drivers: null,
    loading: true,
    modalIsOpen: false,
    modalData: {},
    error: null
  };

  componentDidMount() {
    const { firebase } = this.props;
    firebase.drivers().on("value", snapshot => {
      const drivers = snapshotToArray(snapshot.val());
      this.setState({ drivers, loading: false });
    });
  }

  componentWillUnmount() {
    const { firebase } = this.props;
    firebase.drivers().off();
  }

  openModal = driver => {
    this.setState({ modalIsOpen: true, modalData: driver });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = "#f00";
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false, modalData: {} });
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
    const driver = {
      ...this.state.modalData,
      lastUpdated: moment({}).format()
    };

    firebase
      .driver(driver.uid)
      .set({
        ...driver
      })
      .then(() => {
        this.setState({
          error: {
            type: "success",
            message: "Driver updated!"
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
    const { drivers, loading, modalData, modalIsOpen, error } = this.state;
    const {
      age,
      name,
      image,
      isAvailable,
      branch,
      gender,
      rate,
      address,
      phone
    } = modalData;
    const isInvalid = !age || !name || !phone || !rate || !gender || !address;
    const shouldRender = route === ROUTES.ADMIN.DRIVERS;

    return (
      shouldRender &&
      (!loading ? (
        <>
          <h1 className="uk-heading-bullet text-xl md:text-xl">Manage Cars</h1>
          <table className="uk-table uk-table-middle uk-table-responsive uk-table-divider text-center md:text-left">
            <thead>
              <tr>
                <th>Driver</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Rate</th>
                <th>Centre</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {drivers &&
                drivers.map(driver => {
                  return (
                    <tr key={driver.uid}>
                      <td>
                        <div className="flex flex-col md:flex-row items-center">
                          <img
                            className="w-1/3 md:w-16 mr-0 mb-4 md:mb-0 md:mr-4 rounded-full"
                            alt={driver.name}
                            src={driver.image}
                          />
                          <div className="flex flex-col justify-center">
                            <span className="text-lg md:text-base">
                              {driver.name}
                            </span>
                            <span className="text-sm uk-text-lead">
                              {driver.age} years
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>{driver.phone.toUpperCase()}</td>
                      <td>{driver.address}</td>
                      <td>&#8358;{numberWithCommas(driver.rate)}/hr</td>
                      <td>{driver.centreId}</td>
                      <td>
                        <span
                          className={`uk-badge uk-padding-small ${
                            driver.isAvailable
                              ? "bg-teal-500"
                              : "bg-gray-300 text-gray-700 hover:text-gray-700"
                          }`}
                        >
                          {driver.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => this.openModal(driver)}
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
              contentLabel="Edit Driver"
            >
              <div className="uk-width-xlarge@s flex flex-col justify-between h-screen md:h-auto ">
                <div className="flex justify-between mb-4">
                  <h1 className="uk-heading-bullet text-lg font-bold">
                    Edit Driver
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
                      <label className="uk-form-label text-base" htmlFor="name">
                        Name
                      </label>
                      <div className="uk-form-controls">
                        <input
                          className="uk-input"
                          id="name"
                          name="name"
                          type="text"
                          value={name}
                          onChange={this.onModalInputChange}
                          placeholder="Driver name"
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="uk-width-1-4@s">
                      <label className="uk-form-label text-base" htmlFor="age">
                        Age
                      </label>
                      <div className="uk-form-controls">
                        <input
                          className="uk-input"
                          id="age"
                          name="age"
                          type="text"
                          onChange={this.onModalInputChange}
                          value={age}
                          placeholder="Age"
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
                          min={18}
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
                        htmlFor="phone"
                      >
                        Phone Number
                      </label>
                      <div className="uk-form-controls">
                        <input
                          className="uk-input"
                          id="phone"
                          name="phone"
                          type="text"
                          onChange={this.onModalInputChange}
                          value={phone}
                          placeholder="Phone Number"
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="uk-width-1-4@s">
                      <label
                        className="uk-form-label text-base"
                        htmlFor="gender"
                      >
                        Gender
                      </label>
                      <div className="uk-form-controls">
                        <select
                          className="uk-select"
                          id="gender"
                          name="gender"
                          type="text"
                          onChange={this.onModalInputChange}
                          value={gender}
                          required={true}
                        >
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                    </div>
                    <div className="uk-width-1-4@s">
                      <label
                        className="uk-form-label text-base"
                        htmlFor="branch"
                      >
                        Centre
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
                      <label
                        className="uk-form-label text-base"
                        htmlFor="image"
                      >
                        Image URL
                      </label>
                      <div className="uk-form-controls">
                        <input
                          className="uk-input"
                          id="image"
                          name="image"
                          type="url"
                          value={image}
                          onChange={this.onModalInputChange}
                          placeholder="Image URL"
                          required={true}
                        />
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
                        Update Driver
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

export default withFirebase(Drivers);
