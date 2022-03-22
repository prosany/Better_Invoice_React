import { combineReducers } from "redux";
import login from "./Authentication/Login/reducer";
import signUp from "./Authentication/Signup/reducer";

const rootReducers = combineReducers({
  login,
  signUp,
});

export default rootReducers;
