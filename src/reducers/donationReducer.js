import { FETCH_ALL, ADD_DONATION,UPDATE_DONATION, DELETE_DONATION, SET_EDIT_DATA } from "../actions/types";

const initialState = {
  donations: [],
  donation: {},
};

export default function donationReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        donations: [...action.payload],
      };
    case ADD_DONATION:
      return {
        ...state,
        donations: [...state.donations, action.payload],
      };
    case UPDATE_DONATION:
      return {
        ...state,
        donations: [...state.donations.map((dona)=>(dona._id!==action.payload._id)?dona:action.payload)],
      };
    case DELETE_DONATION:
      return {
        ...state,
        donations: [
          ...state.donations.filter((dona) => dona._id !== action.payload),
        ],
      };
    case SET_EDIT_DATA:
        return {
          ...state,
          donation: action.payload,
        };
    default:
      return state;
  }
}
