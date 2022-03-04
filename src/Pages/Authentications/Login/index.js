import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { handleLogin } from "../../../Store/Authentication/Login/action";
import style from "../../../Styles/Login/login.module.scss";
import jwt_decode from "jwt-decode";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

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
        let accessToken = localStorage.getItem("accessToken");
        let refreshToken = localStorage.getItem("refreshToken");
        if (!accessToken || !refreshToken) {
          localStorage.clear();
        }
        if (accessToken && refreshToken) {
          let results = await jwt_decode(accessToken);
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
  }, [
    history,
    localStorage.getItem("accessToken"),
    localStorage.getItem("refreshToken"),
  ]);
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
            <input
              type="password"
              className="form-control"
              autoComplete="off"
              name="password"
            />
            <Link to="/" className={style.forgot}>
              <i className="fas fa-lock me-2"></i>Forgot Password
            </Link>
            <button className="btn btn-primary w-100 mt-2" type="submit">
              Login
            </button>
            <hr className={style.hr} />
            <span className={style.notAccount}>
              Don't Have an Account? <Link>Create an Account</Link>
            </span>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Login;
