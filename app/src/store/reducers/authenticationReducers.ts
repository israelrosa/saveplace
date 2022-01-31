import { AuthenticationStore, types } from 'store/types/authenticationTypes';
import { createReducer } from '@reduxjs/toolkit';

const initialState: AuthenticationStore = {
  accessToken: '',
  refreshToken: '',
  updateTokenTimerId: 0,
};

const authenticationReducers = createReducer(initialState, {
  [types.AUTH_LOGIN]: (action) => action.payload,
});

export default authenticationReducers;
