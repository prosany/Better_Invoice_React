import { combineReducers } from "redux";
import login from "./Authentication/Login/reducer";

const rootReducers = combineReducers({
  login,
});

export default rootReducers;
