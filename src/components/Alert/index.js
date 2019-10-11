import React from "react";

export default function Alert({ message, type }) {
  type = type ? type : "primary";
  return (
    <div className={` top-0 left-0 uk-alert-${type}`} uk-alert="true">
      <p>{message}</p>
    </div>
  );
}
