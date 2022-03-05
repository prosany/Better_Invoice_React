import { SIGNUP_REQUEST, SIGNUP_FAILURE, SIGNUP_SUCCESS } from "./actionTypes";

const initialState = {
  processing: false,
  processingMessage: "",
  error: false,
  errorMessage: "",
  success: false,
  successMessage: "",
  user: {},
};

const signUp = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      state = {
        ...state,
        processing: true,
        processingMessage: "Signup in progress...",
        error: false,
        errorMessage: "",
        success: false,
        successMessage: "",
      };
      break;
    case SIGNUP_FAILURE:
      state = {
        ...state,
        processing: false,
        processingMessage: "",
        error: true,
        errorMessage: action.payload.error,
        success: false,
        successMessage: "",
      };
      break;
    case SIGNUP_SUCCESS:
      state = {
        ...state,
        processing: false,
        processingMessage: "",
        error: false,
        errorMessage: "",
        success: true,
        successMessage: action.payload.message,
        user: {
          ...action.payload.user,
        },
      };
      break;
    default:
      state = { ...state };
  }
  return state;
};

export default signUp;
