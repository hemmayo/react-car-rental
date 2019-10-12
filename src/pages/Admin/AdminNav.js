import React from "react";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const navItems = [
  { to: ROUTES.ADMIN.ORDERS, text: "Orders" },
  { to: ROUTES.ADMIN.CARS, text: "Cars" },
  { to: ROUTES.ADMIN.DRIVERS, text: "Drivers" },
  { to: ROUTES.ADMIN.USERS, text: "Users" },
  { to: ROUTES.ADMIN.CENTRES, text: "Centres" }
];

const AdminNav = () => {
  const navActive =
    "rounded bg-teal-500 border-transparent hover:border-transparent text-white hover:bg-teal-500 hover:text-white focus:bg-teal-500 focus:text-white";
  const nav = "uk-button uk-button-default rounded w-full";

  return (
    <ul className="flex flex-col md:flex-row">
      {navItems.map(navItem => (
        <li key={navItem.to} className="flex-1 mr-2">
          <NavLink
            exact
            to={navItem.to}
            className={nav}
            activeClassName={navActive}
          >
            {navItem.text}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default AdminNav;
