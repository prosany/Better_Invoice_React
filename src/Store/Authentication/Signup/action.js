import { post } from "../../../Helpers/APIHelper";
import { SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "./actionTypes";

const handleSignUp = (data, history) => async (dispatch) => {
  dispatch(signUpRequest());
  try {
    const response = await post("/registration", data);
    dispatch(signUpSuccess(response.message, response));
    setTimeout(() => {
      history.push("/verify-account");
      dispatch(signUpSuccess("", response));
    }, 5000);
  } catch (error) {
    dispatch(
      signUpFailure(error.response.data.message || "Something went wrong")
    );
  }
};

const signUpRequest = () => ({
  type: SIGNUP_REQUEST,
});

const signUpFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: {
    error,
  },
});

const signUpSuccess = (message, user) => ({
  type: SIGNUP_SUCCESS,
  payload: {
    message,
    user,
  },
});

export { handleSignUp, signUpRequest, signUpFailure, signUpSuccess };
