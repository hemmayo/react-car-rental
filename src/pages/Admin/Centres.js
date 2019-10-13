import React, { Component } from "react";
import Modal from "react-modal";
import moment from "moment";

import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../../components/Firebase";
import { snapshotToArray } from "../../helpers";
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

class Centres extends Component {
  state = {
    centres: null,
    loading: true,
    modalIsOpen: false,
    modalData: {},
    modalAction: null,
    error: null
  };

  componentDidMount() {
    const { firebase } = this.props;
    firebase.centres().on("value", snapshot => {
      const centres = snapshotToArray(snapshot.val()).reverse();
      this.setState({ centres, loading: false });
    });
  }

  componentWillUnmount() {
    const { firebase } = this.props;
    firebase.centres().off();
  }

  openModal = (action, centre) => {
    this.setState({
      modalIsOpen: true,
      modalData: centre,
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

  toggleAvailability = centre => {
    centre.isAvailable = !centre.isAvailable;
    this.props.firebase.centre(centre.uid).set(centre);
  };

  onUpdate = evt => {
    evt.preventDefault();
    const { firebase } = this.props;
    const { modalData, modalAction } = this.state;
    const centre = {
      ...modalData,
      lastUpdated: moment({}).format()
    };

    if (modalAction === "edit") {
      firebase
        .centre(centre.uid)
        .set(centre)
        .then(() => {
          this.setState({
            error: {
              type: "success",
              message: "Centre updated!"
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
        .centres()
        .push(centre)
        .then(() => {
          this.setState({
            error: {
              type: "success",
              message: "Centre added!"
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

  onDelete = uid => {
    if (window.confirm("Are you sure you want to delete this centre?")) {
      this.props.firebase
        .centre(uid)
        .remove()
        .then(() => {
          this.setState({
            error: {
              type: "danger",
              message: "Centre deleted!"
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
      centres,
      loading,
      modalData,
      modalIsOpen,
      modalAction,
      error
    } = this.state;
    const { uid, name, location, phone, email } = modalData;
    const isInvalid = !location || !name || !phone || !email;
    const shouldRender = route === ROUTES.ADMIN.CENTRES;

    return (
      shouldRender &&
      (!loading ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="uk-heading-bullet text-xl md:text-xl">
              Manage Centres
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
                <th>Name</th>
                <th>Location</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {centres &&
                centres.map(centre => {
                  return (
                    <tr key={centre.uid}>
                      <td>{centre.name}</td>
                      <td>{centre.location}</td>
                      <td>{centre.phone}</td>
                      <td>{centre.email}</td>
                      <td>
                        <span
                          title="Tap to toggle"
                          onClick={() => this.toggleAvailability(centre)}
                          className={`cursor-pointer uk-badge uk-padding-small ${
                            centre.isAvailable
                              ? "bg-teal-500"
                              : "bg-gray-300 text-gray-700 hover:text-gray-700"
                          }`}
                        >
                          {centre.isAvailable ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => this.openModal("edit", centre)}
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
              contentLabel="Centre Modal"
            >
              <div className="uk-width-xlarge@s flex flex-col justify-between h-screen md:h-auto ">
                <div className="flex justify-between mb-4">
                  <h1 className="uk-heading-bullet text-lg font-bold capitalize">
                    {modalAction} Centre
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
                    <div className="uk-width-1-1@s">
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
                          placeholder="Centre name"
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="uk-width-1-1@s">
                      <label
                        className="uk-form-label text-base"
                        htmlFor="location"
                      >
                        Location
                      </label>
                      <div className="uk-form-controls">
                        <input
                          className="uk-input"
                          id="location"
                          name="location"
                          type="text"
                          onChange={this.onModalInputChange}
                          value={location}
                          placeholder="Location"
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="uk-width-1-2@s">
                      <label
                        className="uk-form-label text-base"
                        htmlFor="phone"
                      >
                        Phone
                      </label>
                      <div className="uk-form-controls">
                        <input
                          className="uk-input"
                          id="phone"
                          name="phone"
                          type="tel"
                          onChange={this.onModalInputChange}
                          value={phone}
                          placeholder="Phone number"
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="uk-width-1-2@s">
                      <label
                        className="uk-form-label text-base"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      <div className="uk-form-controls">
                        <input
                          className="uk-input"
                          id="email"
                          name="email"
                          type="email"
                          onChange={this.onModalInputChange}
                          value={email}
                          placeholder="Email Address"
                          required={true}
                        />
                      </div>
                    </div>

                    <div className="uk-width-1-1@s">
                      {error && <Alert {...error} />}

                      <button
                        className={`uk-button uk-button-default rounded mr-2`}
                        disabled={isInvalid}
                        type="submit"
                      >
                        {modalAction} Centre
                      </button>
                      <button
                        onClick={() => this.onDelete(uid)}
                        className="uk-button uk-button-danger rounded"
                        type="button"
                      >
                        Delete
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

export default withFirebase(Centres);
