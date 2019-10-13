import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import CarMarker from "./CarMarker";

import { withFirebase } from "../../components/Firebase";

class SimpleMap extends Component {
  static defaultProps = {
    sensorData: {
      lat: 0,
      lng: 0,
      angle: 0
    },
    zoom: 11
  };

  state = {
    sensorData: undefined
  };

  componentDidMount() {
    const { firebase, uid } = this.props;

    firebase.car(uid.car || 0).on("value", snapshot => {
      const car = snapshot.val();
      if (car && car.sensorData) {
        this.setState({ sensorData: car.sensorData });
      } else {
        firebase.driver(uid.driver || 0).on("value", snapshot => {
          const driver = snapshot.val();
          driver &&
            driver.sensorData &&
            this.setState({ sensorData: driver.sensorData });
        });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.car().off();
    this.props.firebase.driver().off();
  }

  handleApiLoaded = (map, maps) => {
    //   use google maps object
  };

  render() {
    const { sensorData } = this.state;

    if (sensorData) {
      sensorData.lat = Number(sensorData.lat);
      sensorData.lng = Number(sensorData.lng);
      sensorData.angle = Number(sensorData.angle);
    }

    return sensorData ? (
      // Important! Always set the container height explicitly
      <div style={{ height: "40vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBzKMGbywShrhLTkUvJUx082I4uZLWaewY"
          }}
          center={sensorData}
          defaultCenter={this.props.sensorData}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
        >
          <CarMarker {...sensorData} />
        </GoogleMapReact>
      </div>
    ) : (
      <div className="uk-placeholder uk-text-center">
        Sensor data not available.
      </div>
    );
  }
}

export default withFirebase(SimpleMap);
