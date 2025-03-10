const initialState = {
  isAuthenticated: false,
  user: null,
};

// 리듀서
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;

// 액션 타입 정의
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

// 액션 생성자 (action creators)
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});
