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
    modalAction: null,
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

  openModal = (action, driver) => {
    this.setState({
      modalIsOpen: true,
      modalData: driver,
      modalAction: action
    });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = "#f00";
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false, modalData: {}, modalAction: null });
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

  toggleAvailability = driver => {
    driver.isAvailable = !driver.isAvailable;
    this.props.firebase.driver(driver.uid).set(driver);
  };

  onUpdate = evt => {
    evt.preventDefault();
    const { firebase } = this.props;
    const { modalData, modalAction } = this.state;
    const driver = {
      ...modalData,
      lastUpdated: moment({}).format()
    };

    if (modalAction === "edit") {
      firebase
        .driver(driver.uid)
        .set(driver)
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
    } else if (modalAction === "create") {
      firebase
        .drivers()
        .push(driver)
        .then(() => {
          this.setState({
            error: {
              type: "success",
              message: "Driver added!"
            }
          });
          setTimeout(() => {
            this.closeModal();
            this.setState({ error: null });
          }, 2500);
        })
        .catch(error => {
          error.type = "warning";
          this.setState({ error });
        });
    }
  };

  render() {
    const { route } = this.props;
    const {
      drivers,
      loading,
      modalData,
      modalIsOpen,
      modalAction,
      error
    } = this.state;
    const {
      age,
      name,
      image,
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
          <div className="flex justify-between items-center">
            <h1 className="uk-heading-bullet text-xl md:text-xl">
              Manage Drivers
            </h1>
            <button
              onClick={() => this.openModal("create", {})}
              className="uk-button uk-button-default rounded flex items-center"
            >
              <span className="mr-2" uk-icon="icon: plus"></span>Add new
            </button>
          </div>
          <table className="uk-table uk-table-middle uk-table-responsive uk-table-divider text-center md:text-left">
            <thead>
              <tr>
                <th>Driver</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Gender</th>
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
                            className="w-32 h-32 md:w-12 md:h-12 mr-0 mb-4 md:mb-0 md:mr-4 rounded-full"
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
                      <td>{driver.phone}</td>
                      <td>{driver.address}</td>
                      <td>{driver.gender}</td>
                      <td>&#8358;{numberWithCommas(driver.rate)}/hr</td>
                      <td>{driver.branch}</td>
                      <td>
                        <span
                          title="Tap to toggle availability"
                          onClick={() => this.toggleAvailability(driver)}
                          className={`cursor-pointer uk-badge uk-padding-small ${
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
                          onClick={() => this.openModal("edit", driver)}
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
                  <h1 className="uk-heading-bullet text-lg font-bold capitalize">
                    {modalAction} Driver
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
                          type="number"
                          min="18"
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
                          min={50}
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
                          type="tel"
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
                          onChange={this.onModalInputChange}
                          value={gender}
                          required={true}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
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
                          <option value="">Select centre</option>
                          <option>Ikeja</option>
                        </select>
                      </div>
                    </div>
                    <div className="uk-width-1-1@s">
                      <label
                        className="uk-form-label text-base"
                        htmlFor="address"
                      >
                        Address
                      </label>
                      <div className="uk-form-controls">
                        <input
                          className="uk-input"
                          id="address"
                          name="address"
                          type="text"
                          value={address}
                          onChange={this.onModalInputChange}
                          placeholder="Address"
                          required={true}
                        />
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
                        className={`uk-button uk-button-default rounded`}
                        disabled={isInvalid}
                        type="submit"
                      >
                        {modalAction} Driver
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
