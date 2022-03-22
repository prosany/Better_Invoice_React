import React from "react";

const Footer = () => {
  return (
    <React.Fragment>
      <div className="text-center my-4" style={{ fontSize: 13 }}>
        Copyright © {new Date().getFullYear()} - BetterInvoice All Rights
        Reserved.
      </div>
    </React.Fragment>
  );
};

export default Footer;
