import { combineReducers } from "redux";
import counterReducer from "./reducers/counterReducer";
import authReducer from "./reducers/authReducer";
import calendarReducer from "./reducers/calendarReducer";
import modificationHistoryReducer from "./reducers/modificationHistoryReducer";
import paymentHistoryReducer from "./reducers/paymentHistoryReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  calendar: calendarReducer,
  modificationHistory: modificationHistoryReducer,
  paymentHistory: paymentHistoryReducer,
});

export default rootReducer;
