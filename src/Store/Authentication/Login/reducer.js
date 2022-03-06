import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./actionTypes";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

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
    case LOGOUT:
      state = {
        processing: false,
        processingMessage: "",
        error: false,
        errorMessage: "",
        success: false,
        successMessage: "",
        user: {},
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

const persistentStore = {
  keyPrefix: "betterInvoice-",
  key: "login",
  storage: storage,
};

export default persistReducer(persistentStore, login);
