import { combineReducers } from 'redux';
import donationReducer from './donationReducer';
import recordReducer from './recordReducer';
import authReducer from './authReducer';
export default combineReducers({
  donationList: donationReducer,
  auth:authReducer,
  recordList:recordReducer,
});
