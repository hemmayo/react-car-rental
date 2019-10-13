import React, { Component } from "react";
import { withFirebase } from "../../../components/Firebase";
import { snapshotToArray } from "../../../helpers";

class Step1 extends Component {
  state = {
    centres: []
  };

  componentDidMount() {
    this.props.firebase.centres().on("value", snapshot => {
      const centres = snapshotToArray(snapshot.val())
        .sort((a, b) => a.name - b.name)
        .filter(centre => centre.isAvailable);
      centres && this.setState({ centres });
    });
  }

  componentWillUnmount() {
    this.props.firebase.centres().off();
  }

  render() {
    const { authUser, pickup, currentStep, handleChange } = this.props;
    const { centres } = this.state;

    if (currentStep !== 1) {
      // Prop: The current step
      return null;
    }

    return (
      <React.Fragment>
        <svg
          className="my-2"
          width="120px"
          height="120px"
          viewBox="0 0 106 125"
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g
              transform="translate(-667.000000, -224.000000)"
              fillRule="nonzero"
            >
              <g transform="translate(667.000000, 224.000000)">
                <g transform="translate(49.000000, 0.000000)">
                  <path
                    d="M29,0.8 C13.8,0.8 1.5,13 1,28.7 C0.6,43.2 14.5,62.3 22.8,72.3 C24.3,74.1 26.6,75.2 29,75.2 C31.4,75.2 33.6,74.1 35.2,72.3 C43.5,62.2 57.5,43.2 57,28.7 C56.5,13 44.2,0.8 29,0.8 Z"
                    fill="#444B54"
                  ></path>
                  <circle fill="#FFFFFF" cx="29" cy="28.8" r="10"></circle>
                </g>
                <g transform="translate(0.000000, 48.000000)" fill="#71C2FF">
                  <path d="M44.7,76.5 C43.5,76.5 42.3,75.7 41.9,74.5 L18,8.8 C17.4,7.2 18.2,5.5 19.8,5 C21.4,4.4 23.1,5.2 23.6,6.8 L47.5,72.6 C48.1,74.2 47.3,75.9 45.7,76.4 C45.4,76.5 45.1,76.5 44.7,76.5 Z"></path>
                  <path d="M3.2,50.1 C2,50.1 0.8,49.3 0.4,48.1 C-0.2,46.5 0.6,44.8 2.2,44.3 L30.4,34 C32,33.4 33.7,34.2 34.2,35.8 C34.8,37.4 34,39.1 32.4,39.6 L4.2,49.9 C3.9,50.1 3.5,50.1 3.2,50.1 Z"></path>
                  <path d="M35.8,17 C34.6,17 33.4,16.2 33,15 C32.4,13.4 33.2,11.7 34.8,11.2 L44.2,7.8 C45.8,7.2 47.5,8 48,9.6 C48.5,11.2 47.8,12.9 46.2,13.4 L36.8,16.8 C36.5,16.9 36.2,17 35.8,17 Z"></path>
                  <path d="M39.9,28.2 C38.7,28.2 37.5,27.5 37.1,26.2 C36.5,24.6 37.3,22.9 38.9,22.3 L53,17.2 C54.6,16.6 56.3,17.4 56.9,19 C57.5,20.6 56.7,22.3 55.1,22.9 L41,28.1 C40.6,28.2 40.3,28.2 39.9,28.2 Z"></path>
                  <path d="M89.5,47.5 C88.3,47.5 87.1,46.7 86.7,45.5 L83.3,36.1 C82.7,34.5 83.5,32.8 85.1,32.3 C86.7,31.7 88.4,32.5 88.9,34.1 L92.3,43.5 C92.9,45.1 92.1,46.8 90.5,47.3 C90.2,47.4 89.8,47.5 89.5,47.5 Z"></path>
                  <path d="M48.5,51.7 C47.3,51.7 46.1,50.9 45.7,49.7 C45.1,48.1 45.9,46.4 47.5,45.9 L94.5,28.8 C96.1,28.2 97.8,29 98.3,30.6 C98.9,32.2 98.1,33.9 96.5,34.4 L49.5,51.5 C49.2,51.7 48.8,51.7 48.5,51.7 Z"></path>
                  <path d="M56,72.4 C54.8,72.4 53.6,71.6 53.2,70.4 L37.1,26.3 C36.5,24.7 37.3,23 38.9,22.5 C40.5,21.9 42.2,22.7 42.7,24.3 L58.8,68.5 C59.4,70.1 58.6,71.8 57,72.3 C56.7,72.4 56.3,72.4 56,72.4 Z"></path>
                  <path d="M35.8,17 C34.6,17 33.4,16.2 33,15 L29.2,4.7 C28.6,3.1 29.4,1.4 31,0.9 C32.6,0.3 34.3,1.1 34.8,2.7 L38.6,13 C39.2,14.6 38.4,16.3 36.8,16.8 C36.5,16.9 36.2,17 35.8,17 Z"></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <div className="my-4">
          <h1 className="text-3xl md:text-3xl font-bold mb-2">
            Hi, {authUser.username}!
          </h1>
          <h2 className="text-xl">Choose a centre near you.</h2>
        </div>
        <div className="my-2 uk-inline w-full md:w-1/3">
          <select
            className="uk-select uk-form-large rounded"
            value={pickup}
            name="pickup"
            onChange={handleChange}
          >
            <option value="">Select centre</option>
            {centres.map(centre => (
              <option key={centre.uid}>{centre.name}</option>
            ))}
          </select>
        </div>
      </React.Fragment>
    );
  }
}

export default withFirebase(Step1);
