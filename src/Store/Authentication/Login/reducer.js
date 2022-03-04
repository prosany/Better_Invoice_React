import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionTypes";

const initialState = {
  processing: false,
  processingMessage: "",
  error: false,
  errorMessage: "",
  success: false,
  successMessage: "",
  user: {},
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      state = {
        ...state,
        processing: true,
        processingMessage: "Login in progress...",
        error: false,
        errorMessage: "",
        success: false,
        successMessage: "",
        user: {},
      };
      break;
    case LOGIN_FAILURE:
      state = {
        ...state,
        processing: false,
        processingMessage: "",
        error: true,
        errorMessage: action.payload.error,
        success: false,
        successMessage: "",
        user: {},
      };
      break;
    case LOGIN_SUCCESS:
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
      break;
  }
  return state;
};

export default login;
