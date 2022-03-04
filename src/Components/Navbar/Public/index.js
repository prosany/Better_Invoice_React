import React from "react";
import { Link } from "react-router-dom";
import style from "../../../Styles/Navbar/navbar.module.scss";

const PublicNavbar = () => {
  return (
    <React.Fragment>
      <div className={`${style.background} border-bottom`}>
        <div className="container">
          <div
            className={`w-100 d-flex align-items-center justify-content-between py-1`}
          >
            <div className="d-flex align-items-center justify-content-center">
              <Link to="/" className={`${style.links} me-2`}>
                <p>
                  <i className="fas fa-home"></i>
                </p>
                Home
              </Link>
            </div>
            <span className={style.logo}>
              BetterInvoice
              <i
                className="far fa-grin-beam-sweat ms-2"
                style={{ fontSize: "1rem" }}
              ></i>
              <p className={style.tagline}>
                Specially Made For Kalpas Employee
              </p>
            </span>
            <div className="d-flex align-items-center justify-content-center">
              <Link to="/" className={`${style.links} ms-2`}>
                <p>
                  <i className="far fa-user-circle"></i>
                </p>
                Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PublicNavbar;
