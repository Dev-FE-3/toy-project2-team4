import { SET_MONTH, SET_YEAR } from "../actionsType";

// 초기 상태
const initialState = {
  year: new Date().getFullYear(), // 현재 년도
  month: new Date().getMonth() + 1, // 현재 월
};

// Reducer
const classCalendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_YEAR:
      return { ...state, year: action.payload };
    case SET_MONTH:
      return { ...state, month: action.payload };
    default:
      return state;
  }
};

export default classCalendarReducer;
