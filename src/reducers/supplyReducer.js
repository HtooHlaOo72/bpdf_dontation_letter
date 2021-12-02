import { FETCH_SUPPLIES,UPDATE_SUPPLY, DELETE_SUPPLY , ADD_SUPPLY, SET_EDIT_SUPPLY, SET_GEN_SUPPLY } from "../actions/types";

const initialState = {
  supplies: [],
};

export default function suppliesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUPPLIES:
      return {
        ...state,
        supplies: [...action.payload],
      };
    case DELETE_SUPPLY:
      return {
        ...state,
        supplies: [
            ...state.supplies.filter((supp) => supp._id !== action.payload),
          ],
      };
    case UPDATE_SUPPLY:
    return {
        ...state,
        supplies: [
            ...state.supplies.map((supp) =>
              supp._id !== action.payload._id ? supp : action.payload
            ),
          ],
    };
    case ADD_SUPPLY:
        return {
            ...state,
            supplies: [...state.supplies,action.payload],
        };
    case SET_EDIT_SUPPLY:
        return {
            ...state,
            e_supply: state.supplies.find((sup)=>sup._id===action.payload)
        };
    case SET_GEN_SUPPLY:
        return {
            ...state,
            g_supply: state.supplies.find((sup)=>sup._id===action.payload)
        };
    default:
      return state;
  }
}
