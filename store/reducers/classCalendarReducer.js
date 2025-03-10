//Actions
const SET_MONTH = 'SET_MONTH';
const SET_YEAR = 'SET_YEAR';
const SET_IS_ADMIN = 'SET_IS_ADMIN';

export const setMonth = (month) => ({
  type: SET_MONTH,
  payload: month,
});

export const setYear = (year) => ({
  type: SET_YEAR,
  payload: year,
});

export const setIsAdmin = (isAdmin) => ({
  type: SET_IS_ADMIN,
  payload: isAdmin,
});




//Reducer
// 초기 상태
const initialState = {
  year: new Date().getFullYear(), // 현재 년도
  month: new Date().getMonth() + 1, // 현재 월
  isAdmin : true,
};

// 리듀서
const classCalendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_YEAR:
      return { ...state, year: action.payload };
    case SET_MONTH:
      return { ...state, month: action.payload };
    case SET_IS_ADMIN:
      return { ...state, isAdmin: action.payload};
    default:
      return state;
  }
};

export default classCalendarReducer;
