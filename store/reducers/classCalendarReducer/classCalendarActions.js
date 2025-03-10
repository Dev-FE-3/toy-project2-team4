import {SET_MONTH, SET_YEAR, SET_IS_ADMIN} from "../actionsType"
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
