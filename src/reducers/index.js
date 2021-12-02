import { combineReducers } from 'redux';
import donationReducer from './donationReducer';
import recordReducer from './recordReducer';
import authReducer from './authReducer';
import suppliesReducer from './supplyReducer';
export default combineReducers({
  donationList: donationReducer,
  auth:authReducer,
  recordList:recordReducer,
  supplyList:suppliesReducer
});
