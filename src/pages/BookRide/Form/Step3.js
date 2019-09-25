import React, { Component } from "react";
import { DateRangePicker } from "react-dates";

import "react-dates/lib/css/_datepicker.css";

export default class Step3 extends Component {
  state = {
    focusedInput: ""
  };
  render() {
    const { pickupDate, dropoffDate, currentStep, handleChange } = this.props;

    if (currentStep !== 3) {
      // Prop: The current step
      return null;
    }

    return (
      <React.Fragment>
        <svg className="my-2 w-20 md:w-24" viewBox="0 0 101 94">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g
              transform="translate(-670.000000, -241.000000)"
              fill-rule="nonzero"
            >
              <g transform="translate(670.500000, 241.000000)">
                <path
                  d="M87,91 L13,91 C7.5,91 3,86.5 3,81 L3,13 C3,7.5 7.5,3 13,3 L87,3 C92.5,3 97,7.5 97,13 L97,81 C97,86.5 92.5,91 87,91 Z"
                  fill="#FFFFFF"
                ></path>
                <path
                  d="M97,28 L3,28 C1.3,28 0,26.7 0,25 C0,23.3 1.3,22 3,22 L97,22 C98.7,22 100,23.3 100,25 C100,26.7 98.7,28 97,28 Z"
                  fill="#454B54"
                ></path>
                <path
                  d="M23,17 C22.2,17 21.4,16.7 20.9,16.1 C20.3,15.6 20,14.8 20,14 C20,13.2 20.3,12.4 20.9,11.9 C22,10.8 24,10.8 25.1,11.9 C25.7,12.5 26,13.2 26,14 C26,14.8 25.7,15.6 25.1,16.1 C24.6,16.7 23.8,17 23,17 Z"
                  fill="#454B54"
                ></path>
                <path
                  d="M50,17 C49.2,17 48.4,16.7 47.9,16.1 C47.3,15.6 47,14.8 47,14 C47,13.2 47.3,12.4 47.9,11.9 C49,10.8 51,10.8 52.1,11.9 C52.7,12.5 53,13.2 53,14 C53,14.8 52.7,15.6 52.1,16.1 C51.6,16.7 50.8,17 50,17 Z"
                  fill="#454B54"
                ></path>
                <path
                  d="M80,17 C79.2,17 78.4,16.7 77.9,16.1 C77.3,15.6 77,14.8 77,14 C77,13.2 77.3,12.4 77.9,11.9 C79,10.8 81,10.8 82.1,11.9 C82.7,12.5 83,13.2 83,14 C83,14.8 82.7,15.6 82.1,16.1 C81.6,16.7 80.8,17 80,17 Z"
                  fill="#454B54"
                ></path>
                <path
                  d="M87,94 L13,94 C5.8,94 0,88.2 0,81 L0,13 C0,5.8 5.8,0 13,0 L87,0 C94.2,0 100,5.8 100,13 L100,81 C100,88.2 94.2,94 87,94 Z M13,6 C9.1,6 6,9.1 6,13 L6,81 C6,84.9 9.1,88 13,88 L87,88 C90.9,88 94,84.9 94,81 L94,13 C94,9.1 90.9,6 87,6 L13,6 Z"
                  id="Shape"
                  fill="#454B54"
                ></path>
                <g transform="translate(13.000000, 35.000000)">
                  <rect
                    fill="#DAE7EF"
                    x="27"
                    y="0"
                    width="20"
                    height="20"
                  ></rect>
                  <rect
                    fill="#C7D7E2"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                  ></rect>
                  <rect
                    fill="#DAE7EF"
                    x="54"
                    y="0"
                    width="20"
                    height="20"
                  ></rect>
                  <rect
                    fill="#C7D7E2"
                    x="27"
                    y="27"
                    width="20"
                    height="20"
                  ></rect>
                  <rect
                    fill="#C7D7E2"
                    x="0"
                    y="27"
                    width="20"
                    height="20"
                  ></rect>
                  <rect
                    fill="#98BED8"
                    x="54"
                    y="27"
                    width="20"
                    height="20"
                  ></rect>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <div className="my-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 w-2/3 mx-auto">
            Choose pick-up and return dates
          </h1>
        </div>
        <div className="my-2 uk-inline md:w-1/3">
          <DateRangePicker
            startDate={pickupDate}
            endDate={dropoffDate}
            withFullScreenPortal={true}
            orientation="vertical"
            onDatesChange={({ startDate, endDate }) => {
              const pickupDate = {
                target: {
                  name: "pickupDate",
                  value: startDate
                }
              };
              const dropoffDate = {
                target: {
                  name: "dropoffDate",
                  value: endDate
                }
              };
              startDate && handleChange(pickupDate);
              handleChange(dropoffDate);
            }} // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          />
        </div>
      </React.Fragment>
    );
  }
}
