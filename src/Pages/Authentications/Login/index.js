import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { handleLogin } from "../../../Store/Authentication/Login/action";
import style from "../../../Styles/Login/login.module.scss";
import jwt_decode from "jwt-decode";

const Login = () => {
  const information = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPass, setShowPass] = useState(false);

  const handleLogins = async (e) => {
    console.log(e);
    e.preventDefault();
    try {
      const data = {
        email: e.target[0].value,
        password: e.target[1].value,
      };
      dispatch(handleLogin(data, history));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const handleToken = async () => {
      try {
        if (!information.user.accessToken || !information.user.refreshToken) {
          localStorage.clear();
        }
        if (information.user.accessToken && information.user.refreshToken) {
          let results = await jwt_decode(information.user.accessToken);
          console.log(results);
          if (Date.now() <= results.exp * 1000) {
            history.push("/");
          }
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    handleToken();
  }, [history, information.user.accessToken, information.user.refreshToken]);
  return (
    <React.Fragment>
      <form onSubmit={handleLogins}>
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
            <label htmlFor="" className="labels" name="email">
              Username or Email
            </label>
            <input type="email" className="form-control" autoComplete="off" />
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
            <Link to="/" className={style.forgot}>
              <i className="fas fa-lock me-2"></i>Forgot Password
            </Link>
            <button
              className="btn btn-primary w-100 mt-2"
              type="submit"
              disabled={information.processing ? true : false}
            >
              {information.processing ? information.processingMessage : "Login"}
            </button>
            {information.error ? (
              <p className="text-danger mt-3 mb-1" style={{ fontSize: 14 }}>
                {information.errorMessage}
              </p>
            ) : null}
            {information.success ? (
              <p className="text-success mt-3 mb-1" style={{ fontSize: 14 }}>
                {information.successMessage}
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
    </React.Fragment>
  );
};

export default Login;
