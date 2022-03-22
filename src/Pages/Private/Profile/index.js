import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Footer from "../../../Components/Footer";
import { handleLogout } from "../../../Store/Authentication/Login/action";

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <div className="container my-4">
        <div className="row">
          <div
            className="col-md-8 rounded p-3 shadow-sm"
            style={{ background: "#fff" }}
          >
            <p className="heading mt-3 mb-2">Plan Information</p>
            <div className="row">
              <div className="col-md-6">
                <label className="labels mb-1">Current Plan</label>
                <p className="m-0">Enterprise</p>
                <Link to="/" style={{ fontSize: 12, textDecoration: "none" }}>
                  Change Current Plan
                </Link>
              </div>
              <div className="col-md-6">
                <label className="labels mb-1">Email</label>
                <p className="m-0">abc@xyz.com</p>
              </div>
              <div className="col-md-6">
                <label className="labels mb-1">Limit</label>
                <p className="m-0">100000 PDF/Month</p>
              </div>
              <div className="col-md-6">
                <label className="labels mb-1">Total PDF Created</label>
                <p className="m-0">455 (03/2022)</p>
              </div>
            </div>

            <p className="heading mt-3 mb-2">Details About You</p>
            <div className="row">
              <div className="col-md-12">
                <label className="labels mb-1">Full Name</label>
                <p className="m-0">ABC XYZ</p>
              </div>
              <div className="col-md-6">
                <label className="labels mb-1">Address</label>
                <p className="m-0">ABC Address</p>
              </div>
              <div className="col-md-6">
                <label className="labels mb-1">State</label>
                <p className="m-0">State</p>
              </div>
              <div className="col-md-6">
                <label className="labels mb-1">Postal Code</label>
                <p className="m-0">3434</p>
              </div>
              <div className="col-md-6">
                <label className="labels mb-1">City</label>
                <p className="m-0">Dhaka</p>
              </div>
              <div className="col-md-6">
                <label className="labels mb-1">Country</label>
                <p className="m-0">Bangladesh</p>
              </div>
            </div>

            <p className="heading mt-3 mb-2">Personal Information</p>
            <div className="row">
              <div className="col-md-12">
                <label className="labels mb-1">Relationship Status</label>
                <p className="m-0">Mingle</p>
              </div>
            </div>

            <p className="heading mt-3 mb-2">Work Information</p>
            <div className="row">
              <div className="col-md-12">
                <label className="labels mb-1">Company Name</label>
                <p className="m-0">ABC Company Name</p>
              </div>
              <div className="col-md-6">
                <label className="labels mb-1">Company Address</label>
                <p className="m-0">ABC Address</p>
              </div>
              <div className="col-md-6">
                <label className="labels mb-1">Company State</label>
                <p className="m-0">State</p>
              </div>
              <div className="col-md-6">
                <label className="labels mb-1">Company Postal Code</label>
                <p className="m-0">3434</p>
              </div>
              <div className="col-md-6">
                <label className="labels mb-1">Company City</label>
                <p className="m-0">Dhaka</p>
              </div>
              <div className="col-md-6">
                <label className="labels mb-1">Company Country</label>
                <p className="m-0">Bangladesh</p>
              </div>
              <div className="col-md-6">
                <label className="labels mb-1">Company Email</label>
                <p className="m-0">abc@xyz.com</p>
              </div>
              <div className="col-md-6">
                <label className="labels mb-1">Company Phone</label>
                <p className="m-0">123456789</p>
              </div>
              <div className="col-md-6">
                <label className="labels mb-1">Company Website</label>
                <p className="m-0">abc.xyz</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <button
              className="btn btn-primary w-100"
              onClick={() => dispatch(handleLogout(history))}
            >
              Logout
            </button>
            <div className="my-2">
              <div className="d-flex justify-content-between align-items-center border rounded p-2">
                <p className="m-0">1</p>
                <p className="m-0">abc_xyz_454545.pdf</p>
                <button className="m-0 btn btn-sm">Regenerate PDF</button>
              </div>
            </div>
            <div className="my-2">
              <div className="d-flex justify-content-between align-items-center border rounded p-2">
                <p className="m-0">2</p>
                <p className="m-0">abc_xyz_454545.pdf</p>
                <button className="m-0 btn btn-sm">Regenerate PDF</button>
              </div>
            </div>
            <div className="my-2">
              <div className="d-flex justify-content-between align-items-center border rounded p-2">
                <p className="m-0">3</p>
                <p className="m-0">abc_xyz_454545.pdf</p>
                <button className="m-0 btn btn-sm">Regenerate PDF</button>
              </div>
            </div>
            <div className="my-2">
              <div className="d-flex justify-content-between align-items-center border rounded p-2">
                <p className="m-0">4</p>
                <p className="m-0">abc_xyz_454545.pdf</p>
                <button className="m-0 btn btn-sm">Regenerate PDF</button>
              </div>
            </div>
            <div className="my-2">
              <div className="d-flex justify-content-between align-items-center border rounded p-2">
                <p className="m-0">5</p>
                <p className="m-0">abc_xyz_454545.pdf</p>
                <button className="m-0 btn btn-sm">Regenerate PDF</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Profile;
