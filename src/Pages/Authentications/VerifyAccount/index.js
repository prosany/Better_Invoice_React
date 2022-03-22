import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import style from "../../../Styles/Login/login.module.scss";

const VerifyAccount = () => {
  const history = useHistory();
  const { secret, otp } = useParams();
  const [process, setProcess] = useState({
    processing: false,
    processingMessage: "",
    error: false,
    errorMessage: "",
    success: false,
    successMessage: "",
  });

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!e.target[0].value)
      return setProcess((prev) => ({
        ...prev,
        success: false,
        successMessage: "",
        error: true,
        errorMessage: "Provide Valid OTP",
        processing: false,
        processingMessage: "",
      }));

    setProcess((prev) => ({
      ...prev,
      success: false,
      successMessage: "",
      error: false,
      errorMessage: "",
      processing: true,
      processingMessage: "Activating Account...",
    }));
    try {
      const response = await axios.get(
        `/verify-account-otp?otp=${e.target[0].value}`
      );
      if (response?.data?.status === 1) {
        setProcess((prev) => ({
          ...prev,
          success: true,
          successMessage: response.data.message,
          error: false,
          errorMessage: "",
          processing: false,
          processingMessage: "",
        }));
        setTimeout(() => {
          history.replace("/login");
        }, 5000);
      } else {
        setProcess((prev) => ({
          ...prev,
          success: false,
          successMessage: "",
          error: true,
          errorMessage: response?.data?.message,
          processing: false,
          processingMessage: "",
        }));
      }
    } catch (error) {
      setProcess((prev) => ({
        ...prev,
        success: false,
        successMessage: "",
        error: true,
        errorMessage: error?.response?.data?.message,
        processing: false,
        processingMessage: "",
      }));
    }
  };

  useEffect(() => {
    if (secret && otp) {
      const activeAccount = async () => {
        try {
          const response = await axios.get(
            `/verify-account?secret=${secret}&otp=${otp}`
          );
          if (response?.data?.status === 1) {
            setProcess((prev) => ({
              ...prev,
              success: true,
              successMessage: response?.data?.message,
              error: false,
              errorMessage: "",
              processing: false,
              processingMessage: "",
            }));
            setTimeout(() => {
              history.replace("/login");
            }, 5000);
          } else {
            setProcess((prev) => ({
              ...prev,
              success: false,
              successMessage: "",
              error: true,
              errorMessage: response?.data?.message,
              processing: false,
              processingMessage: "",
            }));
          }
        } catch (error) {
          setProcess((prev) => ({
            ...prev,
            success: false,
            successMessage: "",
            error: true,
            errorMessage: "Verification Failed, Try Again",
            processing: false,
            processingMessage: "",
          }));
        }
      };
      activeAccount();
    }
  }, [otp, secret]);
  return (
    <React.Fragment>
      {secret && otp && (
        <div className={style.loginBox}>
          <span className={`${style.logo} mb-3`}>
            BetterInvoice
            <i
              className="far fa-grin-beam-sweat ms-2"
              style={{ fontSize: "1rem" }}
            ></i>
            <p className={style.tagline}>Specially Made For Kalpas Employee</p>
          </span>
          {process.error ? null : (
            <div className={`${style.loginForm} shadow-sm rounded text-center`}>
              <h4 className="text-success">
                <i className="fas fa-swimmer"></i>
              </h4>
              <h6 className="text-success">Activating Your Account!</h6>
              <p className="m-0" style={{ fontSize: 13 }}>
                Please wait a moment...
              </p>
              <hr className={style.hr} />
              <span className={style.notAccount}>
                Don't Have an Account?{" "}
                <Link to="/registration">Create an Account</Link>
              </span>
            </div>
          )}
          {process.error ? (
            <p className="text-danger mt-3 mb-1" style={{ fontSize: 14 }}>
              {process.errorMessage}
            </p>
          ) : null}
          {process.success ? (
            <p className="text-success mt-3 mb-1" style={{ fontSize: 14 }}>
              {process.successMessage}
            </p>
          ) : null}
        </div>
      )}

      {!secret && !otp && (
        <form onSubmit={handleVerify}>
          <div className={style.loginBox}>
            <span className={`${style.logo} mb-3`}>
              BetterInvoice
              <i
                className="far fa-grin-beam-sweat ms-2"
                style={{ fontSize: "1rem" }}
              ></i>
              <p className={style.tagline}>
                Specially Made For Kalpas Employee
              </p>
            </span>
            <div className={`${style.loginForm} shadow-sm rounded`}>
              <label htmlFor="" className="labels" name="email">
                OTP
              </label>
              <input
                type="number"
                className="form-control"
                autoComplete="off"
              />

              <button
                className="btn btn-primary w-100 mt-2"
                type="submit"
                disabled={process.processing ? true : false}
              >
                {process.processing
                  ? process.processingMessage
                  : "Activate Account"}
              </button>
              {process.error ? (
                <p className="text-danger mt-3 mb-1" style={{ fontSize: 14 }}>
                  {process.errorMessage}
                </p>
              ) : null}
              {process.success ? (
                <p className="text-success mt-3 mb-1" style={{ fontSize: 14 }}>
                  {process.successMessage}
                </p>
              ) : null}
              <hr className={style.hr} />
              <span className={style.notAccount}>
                Don't Have an Account?{" "}
                <Link to="/registration">Create an Account</Link>
              </span>
            </div>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};

export default VerifyAccount;
