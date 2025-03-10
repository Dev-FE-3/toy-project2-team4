import { combineReducers } from "redux";
import counterReducer from "./reducers/counterReducer";
import authReducer from "./reducers/authReducer";
import classCalendarReducer from "./reducers/classCalendarReducer/classCalendarReducer";
import modificationHistoryReducer from "./reducers/modificationHistoryReducer";
import paymentHistoryReducer from "./reducers/paymentHistoryReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  classCalendar: classCalendarReducer,
  modificationHistory: modificationHistoryReducer,
  paymentHistory: paymentHistoryReducer,
});

export default rootReducer;
