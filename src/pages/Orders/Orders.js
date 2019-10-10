import React, { Component } from "react";
import { withFirebase } from "../../components/Firebase";
import { snapshotToArray, snapshotToObject } from "../../helpers";

class Orders extends Component {
  state = {
    orders: null,
    loading: true
  };

  componentDidMount() {
    let orders;
    this.props.firebase.orders().on("value", snapshot => {
      orders = snapshotToArray(snapshot.val());
      this.setState({ orders }, () => {
        orders.map((order, i) => {
          this.props.firebase
            .cars(order.carId)
            .once("value")
            .then(snapshot => {
              orders[i] = { ...order, car: snapshotToObject(snapshot.val()) };
              this.setState({ orders: [...orders] });
            });
        });
      });
      this.setState({ orders, loading: false });
    });
  }

  componentWillUnmount() {
    this.props.firebase.orders().off();
  }

  render() {
    const { loading, orders } = this.state;
    console.log(orders);

    return !loading ? (
      <table class="uk-table uk-table-justify uk-table-divider">
        <thead>
          <tr>
            <th>Car</th>
            <th>Pickup</th>

            {/* <th>Dropoff</th> */}
            <th>Dropoff</th>
            <th>Driver</th>
            <th class="uk-width-small">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => {
            const carName =
              order.car &&
              order.car.manufacturer +
                ` ` +
                order.car.model +
                " " +
                order.car.year;

            const status = order.status === "not_paid" ? "Pay now" : "Paid";

            return (
              <tr>
                <td>{carName}</td>
                <td>{order.pickup}</td>
                <td>{order.dropoff}</td>
                <td>{order.driverId ? order.driverId : "No driver"}</td>

                <td>
                  <button
                    class={`uk-button ${
                      order.status === "not_paid"
                        ? "uk-button-default"
                        : "bg-green-600"
                    } rounded`}
                    type="button"
                  >
                    {status}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    ) : (
      <div uk-spinner=""></div>
    );
  }
}

export default withFirebase(Orders);
