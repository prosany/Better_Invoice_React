import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionTypes";
import { post } from "../../../Helpers/APIHelper";

const handleLogin = (data, history) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await post("/login", data);
    dispatch(loginSuccess(response.message, response));
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

export { handleLogin, loginRequest, loginFailure, loginSuccess };
