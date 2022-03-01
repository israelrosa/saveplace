import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import queueReducer from './queueReducer';
import tagReducer from './tagReducer';
import userReducer from './userReducer';

const rootReducers = combineReducers({
  auth: authenticationReducer,
  user: userReducer,
  queue: queueReducer,
  tag: tagReducer
});

export default rootReducers;
