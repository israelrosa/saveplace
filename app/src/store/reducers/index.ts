import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import userReducer from './userReducer';

const rootReducers = combineReducers({
  auth: authenticationReducer,
  user: userReducer,
});

export default rootReducers;
