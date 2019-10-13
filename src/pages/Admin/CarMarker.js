import React, { Component } from "react";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyBzKMGbywShrhLTkUvJUx082I4uZLWaewY");
Geocode.setLanguage("en");
Geocode.setRegion("es");
Geocode.enableDebug();

const img =
  "http://www.romolagarai.org/imgs/full/119/1192353_car-png-images-top-view.jpg";

export default class CarMarker extends Component {
  static defaultProps = {
    angle: 0,
    lat: 0,
    lng: 0
  };

  state = {
    address: null
  };

  componendDidMount() {
    const { lat, lng } = this.props;

    Geocode.fromLatLng(lat, lng).then(
      response => {
        this.setState({ address: response.results[0].formatted_address });
      },
      error => {
        console.error(error);
      }
    );
  }
  render() {
    const { lat, lng, angle, lastUpdated } = this.props;
    const { address } = this.state;

    const style = {
      transform: `rotate(${angle - 90}deg)`
    };

    style.filter = !(lat && lng) && "grayscale(1)";

    return (
      <div className="uk-inline">
        {
          <>
            <img src={img} className="h-6" style={style} alt="Car location" />
            <div uk-drop="pos: top">
              <div className="flex flex-col p-4 border shadow rounded bg-gray-100 text-sm font-sans">
                <span>Current address: {address || "Not available"}</span>
                <span>Last updated: {lastUpdated || "Not available"}</span>
              </div>
            </div>
          </>
        }
      </div>
    );
  }
}
