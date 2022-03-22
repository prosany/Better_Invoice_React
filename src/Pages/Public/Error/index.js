import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <React.Fragment>
      <h1>Error Route</h1>
      <Link to="/">Home</Link>
    </React.Fragment>
  );
};

export default Error;
