import React, { Component } from "react";

export default class Car extends Component {
  render() {
    const {
      uid,
      image,
      manufacturer,
      model,
      year,
      transmissionMode,
      noSeats,
      rate,
      selected,
      selectCar
    } = this.props;
    const carName = manufacturer + ` ` + model + " " + year;

    return (
      <a
        href={`https://www.google.com/search?q=${carName}`}
        target="_blank"
        alt={carName}
        rel="noopener noreferrer"
        className="flex flex-col justify-between uk-card uk-card-default p-4 text-sm text-primary hover:text-primary hover:no-underline hover:shadow-lg shadow rounded cursor-pointer"
        title="Click to know more"
      >
        <div className="flex justify-between">
          <div className="flex flex-col items-start w-2/3">
            <h3 className="text-base font-bold">{carName}</h3>
            <span className="text-xs text-gray-600 text-capitalize">
              {transmissionMode}
            </span>
          </div>
          <div className="flex flex-col items-center fill-current">
            <svg width="20" viewBox="0 0 100 125">
              <path d="M28.6,91.2c0,0-18.9-60.2-18-64.5s9.4-6,15.3-1.5s16,39.6,15.1,44.2S30.1,75.3,28.6,91.2z" />
              <path d="M9.2,24.1c0,0-8.2-20.6-6.6-22.6S11.7-1,15.6,3.2c0,0,7.3,12.2,6.6,14.8s-1.5,3.1-3.4,3.1C17,21.1,11.4,20.4,9.2,24.1z" />
              <path d="M94.7,93.2C99.4,84,97,75.5,91,70.6c-6.5-5.3-40.9-2-48.1,3.2c-11.1,8-11.1,19.4-11.1,19.4H94.7z" />
            </svg>
            <span className="text-xs text-gray-600">{noSeats} seats</span>
          </div>
        </div>
        <div className="image p-2">
          <img src={image} alt={carName} />
        </div>
        <div className="flex justify-between items-center text-xl">
          <span>
            <span className="font-semibold text-primary">N{rate}</span>/hr
          </span>
          <button
            onClick={e => {
              e.preventDefault();
              !selected ? selectCar(uid, rate) : selectCar(null, null);
            }}
            className={`uk-button rounded ${
              selected
                ? "bg-primary text-gray-100"
                : "uk-button-default text-primary"
            }`}
          >
            {selected ? (
              <div className="flex items-center">
                <span className="mr-2" uk-icon="check"></span>
                Selected
              </div>
            ) : (
              "Select"
            )}
          </button>
        </div>
      </a>
    );
  }
}
