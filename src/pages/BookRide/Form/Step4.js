import React, { Component } from "react";

export default class Step4 extends Component {
  render() {
    const { editState, currentStep, age } = this.props;

    if (currentStep !== 4) {
      // Prop: The current step
      return null;
    }

    return (
      <React.Fragment>
        <svg
          className="my-2"
          width="120px"
          height="120px"
          viewBox="0 0 139 136"
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-652.000000, -206.000000)">
              <g transform="translate(652.000000, 209.000000)">
                <g
                  transform="translate(0.000000, 7.000000)"
                  fill-rule="nonzero"
                >
                  <g transform="translate(4.000000, 0.000000)">
                    <path
                      d="M95,41 C94.4,41 93.8,41.1 93.2,41.1 C88.2,24.8 73,13 55,13 C37,13 21.8,24.8 16.8,41.1 C16.2,41.1 15.6,41 15,41 C8.4,41 3,46.4 3,53 C3,59.6 8.4,65 15,65 C15.6,65 16.2,64.9 16.8,64.9 C21.8,81.2 37,93 55,93 C73,93 88.2,81.2 93.2,64.9 C93.8,65 94.4,65 95,65 C101.6,65 107,59.6 107,53 C107,46.4 101.6,41 95,41 Z"
                      fill="#FFFFFF"
                    ></path>
                    <path
                      d="M55,96 C36,96 19.5,83.8 13.9,65.7 C13.4,64.1 14.3,62.4 15.9,61.9 C17.5,61.4 19.2,62.3 19.7,63.9 C24.5,79.5 38.7,89.9 55,89.9 C71.3,89.9 85.5,79.4 90.3,63.9 C90.8,62.3 92.5,61.4 94.1,61.9 C95.7,62.4 96.6,64.1 96.1,65.7 C90.5,83.8 74,96 55,96 Z"
                      fill="#444B54"
                    ></path>
                    <path
                      d="M15,68 C6.7,68 0,61.3 0,53 C0,44.8 6.6,38.2 14.7,38 C18.5,27.8 26.2,19.2 36.1,14.4 C37.6,13.7 39.4,14.3 40.1,15.8 C40.8,17.3 40.2,19.1 38.7,19.8 C29.6,24.2 22.7,32.4 19.7,42 C19.3,43.4 17.8,44.3 16.4,44.1 C15.8,44 15.4,44 15,44 C10,44 6,48 6,53 C6,58 10,62 15,62 C15.4,62 15.8,62 16.3,61.9 C17.9,61.7 19.5,62.8 19.7,64.4 C19.9,66 18.8,67.6 17.2,67.8 C16.4,67.9 15.7,68 15,68 Z"
                      fill="#444B54"
                    ></path>
                    <path
                      d="M95,68 C94.3,68 93.6,67.9 92.8,67.8 C91.2,67.6 90,66 90.3,64.4 C90.5,62.8 92.1,61.6 93.7,61.9 C94.2,62 94.6,62 95,62 C100,62 104,58 104,53 C104,48 100,44 95,44 C94.6,44 94.2,44 93.7,44.1 C92.2,44.3 90.8,43.4 90.4,42 C85.6,26.4 71.4,16 55.1,16 C49.9,16 42.1,12.5 42.1,3 C42.1,1.3 43.4,-7.10542736e-15 45.1,-7.10542736e-15 C46.8,-7.10542736e-15 48.1,1.3 48.1,3 C48.1,9.8 54.4,10 55.1,10 C73.3,10 89.2,21.2 95.4,38 C103.5,38.2 110.1,44.8 110.1,53 C110,61.3 103.3,68 95,68 Z"
                      fill="#444B54"
                    ></path>
                    <path
                      d="M54.3,63 C49,63.4 45,68 45,73.3 L45,77 C45,77.1 45,77.2 45,77.2 C45.1,80 48.4,81.4 50.5,79.6 C51.7,78.6 53.3,77.9 55,77.9 C56.7,77.9 58.3,78.5 59.5,79.6 C61.6,81.4 64.9,79.9 65,77.2 C65,77.1 65,77 65,77 L65,73 C65,67.3 60.2,62.6 54.3,63 Z"
                      fill="#444B54"
                    ></path>
                    <path
                      d="M42,53 L38,53 C36.3,53 35,51.7 35,50 C35,48.3 36.3,47 38,47 L42,47 C43.7,47 45,48.3 45,50 C45,51.7 43.7,53 42,53 Z"
                      fill="#444B54"
                    ></path>
                    <path
                      d="M72,53 L68,53 C66.3,53 65,51.7 65,50 C65,48.3 66.3,47 68,47 L72,47 C73.7,47 75,48.3 75,50 C75,51.7 73.7,53 72,53 Z"
                      fill="#444B54"
                    ></path>
                  </g>
                  <g transform="translate(0.000000, 78.000000)">
                    <path
                      d="M79,45 L79,37.9 C92.7,33.6 104.7,24.9 113,13 C115,10.1 114.1,6.1 111.1,4.4 L110.9,4.3 C108.2,2.8 104.9,3.6 103.1,6.1 C93.1,20.4 76.7,29 59,29 C41.3,29 24.9,20.4 14.9,6.2 C13.1,3.7 9.8,2.9 7.1,4.4 L6.9,4.5 C3.9,6.2 3,10.2 5,13 C13.3,24.9 25.3,33.5 39,37.9 L39,45"
                      fill="#FFFFFF"
                    ></path>
                    <path
                      d="M79,48 C77.3,48 76,46.7 76,45 L76,37.9 C76,36.6 76.8,35.4 78.1,35 C91.2,30.9 102.7,22.4 110.5,11.3 C111,10.6 111.2,9.8 111,9 C110.8,8.2 110.3,7.5 109.6,7.1 L109.4,7 C108.1,6.3 106.4,6.7 105.5,7.9 C95,23 77.6,32 59,32 C40.4,32 23,23 12.4,7.9 C11.5,6.6 9.8,6.2 8.5,7 L8.3,7.1 C7.6,7.5 7.1,8.2 6.9,9 C6.7,9.8 6.9,10.7 7.4,11.3 C15.2,22.5 26.8,30.9 39.8,35 C41,35.4 41.9,36.6 41.9,37.9 L41.9,45 C41.9,46.7 40.6,48 38.9,48 C37.2,48 35.9,46.7 35.9,45 L35.9,40.1 C22.4,35.3 10.6,26.4 2.4,14.8 C0.9,12.7 0.4,10.1 1,7.7 C1.6,5.3 3.1,3.1 5.3,1.9 L5.5,1.8 C9.5,-0.4 14.5,0.7 17.2,4.5 C26.8,18 42.4,26 59,26 C75.6,26 91.2,18 100.7,4.5 C103.4,0.7 108.4,-0.5 112.4,1.8 L112.6,1.9 C114.8,3.1 116.4,5.2 116.9,7.7 C117.5,10.2 116.9,12.8 115.5,14.8 C107.3,26.4 95.5,35.4 82,40.1 L82,45 C82,46.7 80.7,48 79,48 Z"
                      fill="#444B54"
                    ></path>
                  </g>
                </g>
                <g transform="translate(72.000000, 0.000000)">
                  <circle
                    fill="#FFFFFF"
                    fillRule="nonzero"
                    cx="32"
                    cy="32"
                    r="32"
                  ></circle>
                  <circle
                    fill="#F48884"
                    fillRule="nonzero"
                    cx="32"
                    cy="32"
                    r="26"
                  ></circle>
                  <circle
                    stroke="#444B54"
                    strokeWidth="6"
                    cx="32"
                    cy="32"
                    r="32"
                  ></circle>
                  <path
                    d="M18,31.5 L47,31.5"
                    stroke="#FFFFFF"
                    strokeWidth="6"
                    strokeLinecap="round"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <div className="my-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            How old are you?
          </h1>
          <h2 className="text-xl">
            We need to know that you’re legally allowed to drive.
          </h2>
        </div>
        <div className="my-2 uk-inline w-full md:w-1/3">
          <div class=" uk-button-group my-2">
            <button
              type="button"
              className={`uk-button uk-button-large ${
                age !== "18 - 24"
                  ? "uk-button-default"
                  : "bg-blue-500 hover:bg-blue-700 text-white"
              } rounded text-lg`}
              onClick={() => editState("age", "18 - 24")}
            >
              18 - 24
            </button>
            <button
              type="button"
              className={`uk-button uk-button-large ${
                age !== "25 - 70"
                  ? "uk-button-default"
                  : "bg-blue-500 hover:bg-blue-700 text-white"
              } rounded text-lg`}
              onClick={() => editState("age", "25 - 70")}
            >
              25 - 70
            </button>
            <button
              type="button"
              className={`uk-button uk-button-large ${
                age !== "71+"
                  ? "uk-button-default"
                  : "bg-blue-500 hover:bg-blue-700 text-white"
              } rounded text-lg`}
              onClick={() => editState("age", "71+")}
            >
              71+
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
