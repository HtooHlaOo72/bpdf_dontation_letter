import { FETCH_RECORDS,DELETE_RECORDS } from "../actions/types";

const initialState = {
  records: [],
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RECORDS:
      return {
        ...state,
        records: [...action.payload],
      };
    case DELETE_RECORDS:
      return {
        ...state,
        records: [],
      };
    default:
      return state;
  }
}
