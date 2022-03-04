import React from "react";
import PublicNavbar from "../Components/Navbar/Public";

const NoLoginLayout = ({ children }) => {
  return (
    <React.Fragment>
      <PublicNavbar />
      <div>{children}</div>
    </React.Fragment>
  );
};

export default React.memo(NoLoginLayout);
