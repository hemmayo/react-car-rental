import React, { Component } from "react";
import moment from "moment";
import PaystackButton from "react-paystack";

import { withFirebase } from "../../components/Firebase";
import { snapshotToArray, numberWithCommas } from "../../helpers";

class Orders extends Component {
  state = {
    orders: null,
    key: "pk_test_0666e4531f6f0b07e7b19f7b767a4f7d5075e30a",
    currentOrder: null,
    loading: true
  };

  componentDidMount() {
    let orders;
    this.props.firebase.orders().on("value", snapshot => {
      orders = (snapshotToArray(snapshot.val()) || []).filter(
        order => order.userId === this.props.firebase.auth.currentUser.uid
      );
      if (orders) {
        const od = [...orders].reverse();
        od.forEach((order, i) => {
          this.props.firebase
            .car(order.carId)
            .once("value")
            .then(snapshot => {
              const car = snapshot.val();
              if (car) {
                od[i] = { ...order, car };

                this.setState({ orders: od });
              }

              return od;
            })
            .then(od => {
              od.forEach((order, i) => {
                order.driverId &&
                  this.props.firebase
                    .driver(order.driverId)
                    .once("value")
                    .then(snapshot => {
                      od[i] = {
                        ...order,
                        driver: snapshot.val()
                      };
                      this.setState({ orders: od });
                    });
              });
            });
        });
      }
      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    this.props.firebase.orders().off();
  }

  paymentCallback = response => {
    const firebase = this.props.firebase;
    const { currentOrder } = this.state;
    console.log(currentOrder);
    // if (response.status === "success") {
    firebase.order(currentOrder.uid).set({ ...currentOrder, status: "paid" });
    // }
  };

  onPaymentClose = () => {
    console.log("Payment closed");
  };

  getReference = () => {
    //you can put any unique reference implementation code here
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };

  render() {
    const { loading, orders } = this.state;
    return orders && !loading ? (
      <table className="uk-table uk-table-divider uk-table-responsive uk-table-middle">
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
              <tr key={order.uid}>
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
                      {moment(order.pickupDate).format("ddd, Do MMMM, YYYY")}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col">
                    {order.dropoff}
                    <span className="text-sm">
                      {moment(order.dropoffDate).format("ddd, Do MMMM, YYYY")}
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
                  {order.status === "not_paid" ? (
                    <PaystackButton
                      text="Pay now"
                      className={`w-full uk-button ${
                        order.status === "not_paid"
                          ? "uk-button-default"
                          : "bg-green-500 text-gray-100"
                      } rounded`}
                      disabled={order.status !== "not_paid"}
                      callback={response => {
                        this.setState({ currentOrder: order });
                        this.paymentCallback(response);
                      }}
                      close={this.onPaymentClose}
                      embed={false}
                      reference={this.getReference()}
                      email={this.props.me.email}
                      amount={order.price * 100}
                      paystackkey={this.state.key}
                      tag="button"
                    />
                  ) : (
                    <span
                      className="w-full uk-button
                      bg-green-500 text-gray-100 rounded"
                    >
                      Paid
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    ) : !orders && loading ? (
      <div uk-spinner=""></div>
    ) : (
      <div>No order available. </div>
    );
  }
}

export default withFirebase(Orders);
