import { SET_MONTH, SET_YEAR } from "../actionsType";
export const setMonth = (month) => ({
  type: SET_MONTH,
  payload: month,
});

export const setYear = (year) => ({
  type: SET_YEAR,
  payload: year,
});

