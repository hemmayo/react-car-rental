import React, { Component } from "react";
import Modal from "react-modal";
import moment from "moment";

import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../../components/Firebase";
import { snapshotToArray, numberWithCommas } from "../../helpers";
import Map from "./Map";

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

class Orders extends Component {
  state = {
    orders: null,
    loading: true,
    modalIsOpen: false,
    modalData: {},
    modalAction: null,
    error: null
  };

  componentDidMount() {
    const { firebase } = this.props;
    firebase.orders().on("value", snapshot => {
      const orders = snapshotToArray(snapshot.val());
      orders && orders.sort((a, b) => (a.status === "paid" ? -1 : 1));
      orders
        ? orders.forEach((order, i) => {
            this.props.firebase
              .car(order.carId)
              .once("value")
              .then(snapshot => {
                const car = snapshot.val();
                if (car) {
                  orders[i] = { ...order, car };
                }

                return orders;
              })
              .then(orders => {
                orders.forEach((order, i) => {
                  order.driverId &&
                    this.props.firebase
                      .driver(order.driverId)
                      .once("value")
                      .then(snapshot => {
                        orders[i] = {
                          ...order,
                          driver: snapshot.val()
                        };
                      });
                });
                return orders;
              })
              .then(orders => {
                orders.forEach((order, i) => {
                  order.userId &&
                    this.props.firebase
                      .user(order.userId)
                      .once("value")
                      .then(snapshot => {
                        orders[i] = {
                          ...order,
                          user: snapshot.val()
                        };
                        this.setState({ orders: orders });
                      });
                });
                this.setState({ orders, loading: false });
              });
          })
        : this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    const { firebase } = this.props;
    firebase.orders().off();
  }

  openModal = (action, order) => {
    this.setState({ modalIsOpen: true, modalData: order, modalAction: action });
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

  render() {
    const { route } = this.props;
    const { orders, loading, modalData, modalIsOpen, modalAction } = this.state;
    const {
      car,
      driver,
      dropoff,
      dropoffDate,
      pickup,
      pickupDate,
      status
    } = modalData;
    const shouldRender = route === ROUTES.ADMIN.ORDERS;

    return (
      shouldRender &&
      (!loading ? (
        orders ? (
          <>
            <div className="flex justify-between items-center">
              <h1 className="uk-heading-bullet text-xl md:text-xl">Orders</h1>
            </div>

            <table className="uk-table uk-table-divider uk-table-hover uk-table-responsive uk-table-middle">
              <thead>
                <tr>
                  <th className="uk-width-medium">Car</th>
                  <th>Pickup</th>
                  <th>Dropoff</th>
                  <th>Driver</th>
                  <th>Price</th>
                  <th className="uk-width-small">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                  let carName;
                  if (order.car) {
                    carName =
                      order.car.manufacturer +
                      ` ` +
                      order.car.model +
                      " " +
                      order.car.year;
                  }

                  return (
                    <tr
                      className="cursor-pointer"
                      key={order.uid}
                      onClick={() => this.openModal("monitor", order)}
                    >
                      <td>
                        {order.car ? (
                          <div className="flex">
                            <img
                              className="w-24 mr-4"
                              alt={carName}
                              src={order.car.image}
                            />
                            <div className="flex flex-col justify-center">
                              <span>{carName}</span>
                              <span className="text-sm uk-text-lead">
                                {order.car.noSeats} seats
                              </span>
                            </div>
                          </div>
                        ) : (
                          "No car"
                        )}
                      </td>
                      <td>
                        <div className="flex flex-col">
                          {order.pickup}
                          <span className="text-sm">
                            {moment(order.pickupDate).format(
                              "ddd, Do MMMM, YYYY"
                            )}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col">
                          {order.dropoff}
                          <span className="text-sm">
                            {moment(order.dropoffDate).format(
                              "ddd, Do MMMM, YYYY"
                            )}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center">
                          {order.driver && (
                            <img
                              className="w-10 rounded-full mr-4"
                              alt={order.driver.name}
                              src={order.driver.image}
                            />
                          )}
                          <span>
                            {order.driver ? order.driver.name : "No driver"}
                          </span>
                        </div>
                      </td>
                      <td>&#8358;{numberWithCommas(Number(order.price))}</td>

                      <td>
                        <span
                          className={`cursor-pointer uk-badge uk-padding-small ${
                            order.status === "paid"
                              ? "bg-teal-500"
                              : "bg-gray-300 text-gray-700 hover:text-gray-700"
                          }`}
                        >
                          {order.status === "paid" ? "Paid" : "Not paid"}
                        </span>
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
                contentLabel="Monitor Order"
              >
                <div className="uk-width-xxlarge@s flex flex-col justify-between h-screen md:h-auto ">
                  <div className="flex justify-between mb-4">
                    <div className="flex items-center">
                      <h1 className="uk-heading-bullet text-lg font-bold capitalize mr-4">
                        {modalAction} Order -{" "}
                        {(car &&
                          `${car.manufacturer} ${car.model} ${car.year}`) ||
                          (driver && driver.name) ||
                          null}
                      </h1>
                      <span
                        className={`uk-badge p-3 ${
                          status === "paid"
                            ? "bg-teal-500"
                            : "bg-gray-300 text-gray-700 hover:text-gray-700"
                        }`}
                      >
                        {status === "paid" ? "Paid" : "Not paid"}
                      </span>
                    </div>

                    <span
                      className="cursor-pointer"
                      uk-icon="icon: close"
                      onClick={this.closeModal}
                    ></span>
                  </div>
                  <div className="flex flex-col flex-1">
                    <table className="uk-table uk-table-small uk-table-responsive">
                      <thead>
                        <tr>
                          <th>Pickup</th>
                          <th>Dropoff</th>
                          <th>Driver</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="flex flex-col">
                              {pickup}
                              <span className="text-sm">
                                {moment(pickupDate).format(
                                  "ddd, Do MMMM, YYYY"
                                )}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="flex flex-col">
                              {dropoff}
                              <span className="text-sm">
                                {moment(dropoffDate).format(
                                  "ddd, Do MMMM, YYYY"
                                )}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center">
                              {driver && (
                                <img
                                  className="w-10 rounded-full mr-4"
                                  alt={driver.name}
                                  src={driver.image}
                                />
                              )}
                              <span>{driver ? driver.name : "No driver"}</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <Map
                      uid={{
                        car: car && car.uid,
                        driver: driver && driver.uid
                      }}
                    />
                  </div>
                </div>
              </Modal>
            </table>
          </>
        ) : (
          <div>No orders available.</div>
        )
      ) : (
        <div uk-spinner="true"></div>
      ))
    );
  }
}

export default withFirebase(Orders);
