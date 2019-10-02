import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div uk-spinner="ratio: 2"></div>
      <p className="my-2">loading...</p>
    </div>
  );
}
