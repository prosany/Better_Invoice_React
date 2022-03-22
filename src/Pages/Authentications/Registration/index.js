import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { handleSignUp } from "../../../Store/Authentication/Signup/action";
import style from "../../../Styles/Login/login.module.scss";

const Registration = () => {
  const information = useSelector((state) => state.signUp);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPass, setShowPass] = useState(false);
  const [notFiled, setNotFiled] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    setNotFiled(false);
    if (
      !e.target[0].value ||
      !e.target[1].value ||
      !e.target[2].value ||
      !e.target[3].value
    )
      return setNotFiled(true);
    try {
      const data = {
        name: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value,
        confirmPassword: e.target[3].value,
        plan: "free",
      };
      dispatch(handleSignUp(data, history));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <React.Fragment>
      <form onSubmit={handleRegistration}>
        <div className={style.loginBox}>
          <span className={`${style.logo} mb-3`}>
            BetterInvoice
            <i
              className="far fa-grin-beam-sweat ms-2"
              style={{ fontSize: "1rem" }}
            ></i>
            <p className={style.tagline}>Specially Made For Kalpas Employee</p>
          </span>
          <div className={`${style.loginForm} shadow-sm rounded`}>
            <label htmlFor="name" className="labels" name="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="fullName"
              className="form-control"
              autoComplete="off"
            />

            <label htmlFor="email" className="labels" name="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              autoComplete="off"
            />

            <label htmlFor="" className="labels">
              Password
            </label>
            <div className={style.showHidePass}>
              <input
                type={showPass ? "text" : "password"}
                className="form-control"
                autoComplete="off"
                name="password"
              />
              <span onClick={() => setShowPass(!showPass)}>
                {showPass ? (
                  <i className="fas fa-eye"></i>
                ) : (
                  <i className="fas fa-eye-slash"></i>
                )}
              </span>
            </div>

            <label htmlFor="" className="labels">
              Confirm Password
            </label>
            <div className={style.showHidePass}>
              <input
                type={showPass ? "text" : "password"}
                className="form-control"
                autoComplete="off"
                name="confirmPassword"
              />
              <span onClick={() => setShowPass(!showPass)}>
                {showPass ? (
                  <i className="fas fa-eye"></i>
                ) : (
                  <i className="fas fa-eye-slash"></i>
                )}
              </span>
            </div>

            <label htmlFor="plan" className="labels" name="email">
              Plan
            </label>
            <input
              type="text"
              id="plan"
              className="form-control"
              autoComplete="off"
              value="Free"
              disabled
            />
            <p className="mt-2 mb-1 text-muted" style={{ fontSize: 12 }}>
              Free Plans Comes with Limited Features - You Can Create 2
              PDF/Month <br />
              Contact Support To Change Plan
            </p>

            <button
              className="btn btn-primary w-100 mt-2"
              type="submit"
              disabled={information.processing ? true : false}
            >
              {information.processing
                ? information.processingMessage
                : "Registration"}
            </button>
            {information.error ? (
              <p className="text-danger mt-3 mb-1" style={{ fontSize: 14 }}>
                {information.errorMessage}
              </p>
            ) : null}
            {notFiled ? (
              <p className="text-danger mt-3 mb-1" style={{ fontSize: 14 }}>
                Please Fill All The Fields
              </p>
            ) : null}
            {information.success ? (
              <p className="text-success mt-3 mb-1" style={{ fontSize: 14 }}>
                {information.successMessage}
              </p>
            ) : null}
            <hr className={style.hr} />
            <span className={style.notAccount}>
              Already Have an Account? <Link to="/login">Login</Link>
            </span>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Registration;
