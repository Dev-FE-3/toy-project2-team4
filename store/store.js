import { createStore } from "redux";
// import counterReducer from "./reducers/counterReducer";
import rootReducer from "./rootReducer";

// createStore로 스토어를 생성합니다
const store = createStore(
  rootReducer,
  typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined,
);

export default store;
