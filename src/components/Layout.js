import React from "react";
import Navigation from "./Navigation";

const PageLayout = ({ children }) => (
  <div
    className="bg-white font-sans flex flex-col justify-between"
    style={{ minHeight: "100vh" }}
  >
    <Navigation />
    <main className=" flex justify-center items-center">{children}</main>
    <footer className="uk-padding uk-background-muted uk-text-center">
      ©2019 Car Rental created by Emma Popoola
    </footer>
  </div>
);

export default PageLayout;
