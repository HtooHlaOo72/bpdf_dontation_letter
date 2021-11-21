import { CHANGE_SUCCESS, LOGIN} from '../actions/types';

const initialState = {
  isAuthenticated:false,
  token:"",
  error:""
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated:(action.payload?.success)?action.payload.success:false,
        token:(action.payload?.token)?action.payload.token:"",
        role:(action.payload?.role)?action.payload.role:"",
        error:(action.payload?.error)?action.payload.error:""
      };
      case CHANGE_SUCCESS:
        return {
          ...state,
          changeResponse:action.payload.changeResponse
        };
    
    default:
      return state;
  }
}
