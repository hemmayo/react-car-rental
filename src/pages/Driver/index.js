import React from "react";
import { geolocated } from "react-geolocated";
import Layout from "../../components/Layout";

const status = { type: "warning", text: "waiting for input..." };

class Driver extends React.Component {
  state = {
    driverId: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidUpdate() {
    if (this.props.coords) {
      const { latitude: lat, longitude: lng, speed } = this.props.coords;
      const { driverId: uid } = this.state;

      fetch(
        "https://cors-anywhere.herokuapp.com/https://us-central1-car-rental-428b2.cloudfunctions.net/driver_sensor_update",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ uid, lat, lng, speed })
        }
      ).then(res => {
        const type = res.ok ? "success" : "danger";
        status.type = type;

        res.text().then(text => {
          status.text = text;
        });
      });
    }
  }

  render() {
    return (
      <Layout type="no-center">
        <h1 className="text-2xl my-4 uk-heading-bullet">Driver tracking</h1>
        {!this.props.isGeolocationAvailable ? (
          <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
          <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
          <>
            <input
              className="uk-input uk-form-large rounded"
              value={this.state.driverId}
              name="driverId"
              placeholder="Enter your Driver ID"
              onChange={this.onChange}
              type="text"
            />
            {status && (
              <div className={`uk-alert uk-alert-${status.type}`}>
                {status.text}
              </div>
            )}
            <table className="uk-table uk-table-responsive uk-table-divider">
              <tbody>
                <tr>
                  <td>latitude</td>
                  <td>{this.props.coords.latitude}</td>
                </tr>
                <tr>
                  <td>longitude</td>
                  <td>{this.props.coords.longitude}</td>
                </tr>
                <tr>
                  <td>altitude</td>
                  <td>{this.props.coords.altitude}</td>
                </tr>
                <tr>
                  <td>heading</td>
                  <td>{this.props.coords.heading}</td>
                </tr>
                <tr>
                  <td>speed</td>
                  <td>{this.props.coords.speed}</td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <div>Getting the location data&hellip; </div>
        )}
      </Layout>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity
  },
  watchPosition: true,
  userDecisionTimeout: null,
  suppressLocationOnMount: false,
  geolocationProvider: navigator.geolocation,
  isOptimisticGeolocationEnabled: true
})(Driver);
