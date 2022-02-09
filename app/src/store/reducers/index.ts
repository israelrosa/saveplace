import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducers';

const rootReducers = combineReducers({
  auth: authenticationReducer,
});

export default rootReducers;
