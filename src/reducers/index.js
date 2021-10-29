import { combineReducers } from 'redux';
import donationReducer from './donationReducer';
import authReducer from './authReducer';
export default combineReducers({
  donationList: donationReducer,
  auth:authReducer,
});
