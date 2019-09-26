import React, { Component } from "react";
import { SingleDatePicker } from "react-dates";
import moment from "moment";

export default class MiniBar extends Component {
  state = {
    focused: ""
  };

  render() {
    const {
      pickup,
      dropoff,
      pickupDate,
      dropoffDate,
      handleChange,
      onDatesChange
    } = this.props;

    return (
      <div className="w-full flex uk-card uk-card-default p-4 rounded uk-margin">
        <div className="mr-2">
          <label className="text-sm">Pick-up location</label>
          <input
            className="uk-input uk-form rounded mt-1 text-sm"
            type="text"
            value={pickup}
            name="pickup"
            placeholder="Type a location"
            onChange={handleChange}
          />
        </div>
        <div className="mr-2">
          <label className="text-sm">Drop-off location</label>
          <input
            className="uk-input uk-form rounded mt-1 text-sm"
            type="text"
            value={dropoff}
            name="dropoff"
            placeholder="Type a location"
            onChange={handleChange}
          />
        </div>
        <div className="mr-2">
          <label className="text-sm">Pick-up date</label>
          <input
            className="uk-input uk-form rounded mt-1 text-sm"
            type="text"
            value={pickupDate}
            disabled={true}
          />
        </div>
        <div className="mr-2">
          <label className="text-sm">Drop-off date</label>
          <input
            className="uk-input uk-form rounded mt-1 text-sm"
            type="text"
            value={dropoffDate}
            disabled={true}
          />
        </div>
        <div className="flex items-end">
          <button className="uk-button uk-button-default rounded">Edit</button>
        </div>
      </div>
    );
  }
}
