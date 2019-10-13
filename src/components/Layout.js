import React from "react";
import Navigation from "./Navigation";

const PageLayout = ({ children, type }) => (
  <div
    className={`bg-white font-sans flex flex-col ${
      type !== "no-center" ? "justify-between" : ""
    }`}
    style={{ minHeight: "100vh" }}
  >
    <Navigation />
    <main
      className={`relative flex flex-col ${
        type !== "no-center" ? "justify-center items-center" : ""
      } text-primary p-6`}
    >
      {children}
    </main>
    <footer className="uk-padding uk-background-muted uk-text-center">
      ©2019 Car Rental
    </footer>
  </div>
);

export default PageLayout;
