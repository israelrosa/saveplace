import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducers';

const rootReducers = combineReducers({
  authenticationReducer,
});

export default rootReducers;
