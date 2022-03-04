import React from "react";
import { Link } from "react-router-dom";

const Plans = () => {
  return (
    <React.Fragment>
      <Link to="/plans">Plans</Link>
      <Link to="/profile">Profile</Link>
    </React.Fragment>
  );
};

export default Plans;
