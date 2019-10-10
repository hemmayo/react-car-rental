import React, { Component } from "react";
import moment from "moment";
import { withFirebase } from "../../components/Firebase";
import {
  snapshotToArray,
  snapshotToObject,
  getPrice,
  numberWithCommas
} from "../../helpers";

class Orders extends Component {
  state = {
    orders: null,
    loading: true
  };

  componentDidMount() {
    let orders;
    this.props.firebase.orders().on("value", snapshot => {
      orders = snapshotToArray(snapshot.val());
      if (orders) {
        let od = [...orders];
        od.forEach((order, i) => {
          this.props.firebase
            .cars(order.carId)
            .once("value")
            .then(snapshot => {
              od[i] = { ...order, car: snapshotToObject(snapshot.val()) };

              this.setState({ orders: od });
              return od;
            })
            .then(od => {
              od.forEach((order, i) => {
                order.driverId &&
                  this.props.firebase
                    .drivers(order.driverId)
                    .once("value")
                    .then(snapshot => {
                      od[i] = {
                        ...order,
                        driver: snapshotToObject(snapshot.val())
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

  render() {
    const { loading, orders } = this.state;
    return orders && !loading ? (
      <table class="uk-table uk-table-divider uk-table-responsive uk-table-middle">
        <thead>
          <tr>
            <th class="uk-width-medium">Car</th>
            <th>Pickup</th>
            <th>Dropoff</th>
            <th>Driver</th>
            <th>Price</th>
            <th class="uk-width-small">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => {
            let carName, status;
            if (order.car) {
              carName =
                order.car.manufacturer +
                ` ` +
                order.car.model +
                " " +
                order.car.year;

              status = order.status === "not_paid" ? "Pay now" : "Paid";

              getPrice(order.car.rate, order.pickupDate, order.dropoffDate);
            }

            return (
              <tr>
                <td className="flex">
                  <img class="w-24 mr-4" src={order.car && order.car.image} />
                  <div className="flex flex-col justify-center">
                    <span>{carName}</span>
                    <span className="text-sm uk-text-lead">4 seats</span>
                  </div>
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
                        class="w-10 rounded-full mr-4"
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
                  <button
                    class={`uk-button ${
                      order.status === "not_paid"
                        ? "uk-button-default"
                        : "bg-green-600"
                    } rounded`}
                    type="button"
                    disabled={order.status !== "not_paid"}
                  >
                    {status}
                  </button>
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
