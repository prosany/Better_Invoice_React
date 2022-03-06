import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./actionTypes";
import { post } from "../../../Helpers/APIHelper";

const handleLogin = (data, history) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await post("/login", data);
    dispatch(loginSuccess(response.message, response));
    localStorage.setItem("refreshToken", response.refreshToken);
    setTimeout(() => {
      history.push("/");
      dispatch(loginSuccess("", response));
    }, 2000);
  } catch (error) {
    dispatch(
      loginFailure(error.response.data.message || "Invalid Credentials")
    );
  }
};

const handleLogout = (history) => async (dispatch) => {
  try {
    const response = await post(
      "/logout",
      {},
      {
        headers: {
          refresh_token: localStorage.getItem("refreshToken"),
        },
      }
    );
    if (response.status === 1) {
      dispatch(logout());
      history.push("/login");
    }
    dispatch(logout());
  } catch (error) {
    dispatch(
      loginFailure(error.response.data.message || "Invalid Credentials")
    );
  }
};

const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: {
    error,
  },
});

const loginSuccess = (message, user) => ({
  type: LOGIN_SUCCESS,
  payload: {
    message,
    user,
  },
});

const logout = () => ({
  type: LOGOUT,
});

export {
  handleLogin,
  handleLogout,
  loginRequest,
  loginFailure,
  loginSuccess,
  logout,
};
