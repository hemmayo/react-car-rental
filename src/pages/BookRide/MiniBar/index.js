import React, { Component } from "react";

export default class MiniBar extends Component {
  state = {
    focused: ""
  };

  render() {
    const { type, pickup, dropoff, pickupDate, dropoffDate } = this.props;

    const margin = type === "mini" ? "mb-2" : "mr-2";

    const fields = {
      pickup: (
        <div className={margin}>
          <label className="text-sm">Pick-up location</label>
          <input
            className="uk-input uk-form rounded mt-1 text-sm"
            type="text"
            value={pickup}
            name="dropoff"
          />
        </div>
      ),
      dropoff: (
        <div className={margin}>
          <label className="text-sm">Drop-off location</label>
          <input
            className="uk-input uk-form rounded mt-1 text-sm"
            type="text"
            value={dropoff}
          />
        </div>
      ),
      pickupDate: (
        <div className={margin}>
          <label className="text-sm">Pick-up date</label>
          <input
            className="uk-input uk-form rounded mt-1 text-sm"
            type="text"
            value={pickupDate}
            disabled={true}
          />
        </div>
      ),
      dropoffDate: (
        <div className={margin}>
          <label className="text-sm">Drop-off date</label>
          <input
            className="uk-input uk-form rounded mt-1 text-sm"
            type="text"
            value={dropoffDate}
            disabled={true}
          />
        </div>
      )
    };

    return (
      (pickup.length !== 0 || dropoff.length !== 0) && (
        <div
          className={`${
            type === "mini"
              ? "w-full md:w-1/4 absolute top-0 right-0 m-2"
              : "md:flex-row"
          } flex flex-col uk-card uk-card-default p-4 rounded uk-margin`}
        >
          {pickup && fields.pickup}
          {dropoff && fields.dropoff}
          {pickupDate.length > 0 && pickup && fields.pickupDate}
          {dropoffDate.length > 0 && dropoff && fields.dropoffDate}
          <div className="flex items-end">
            <button
              className={`uk-button uk-button-default rounded ${
                type === "mini" ? "hidden" : ""
              }`}
            >
              Edit
            </button>
          </div>
        </div>
      )
    );
  }
}
