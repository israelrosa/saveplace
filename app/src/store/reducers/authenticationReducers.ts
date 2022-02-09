import { AuthenticationStore, types } from 'store/types/authenticationTypes';
import { createReducer } from '@reduxjs/toolkit';

const initialState: AuthenticationStore = {
  accessToken: '',
  refreshToken: '',
  updateTokenTimerId: 0,
  isLoading: false,
  isLoggedIn: false,
  error: undefined,
};

const authenticationReducers = createReducer(initialState, {
  [types.AUTH_LOGIN]: (action) => action.payload,
  [types.USER_REGISTER_REQUEST]: () => ({ isLoading: true }),
  [types.USER_REGISTER_SUCCESS]: (_, action) => action.payload,
  [types.USER_REGISTER_FAILURE]: (_, action) => ({ isLoading: false, error: action.error }),
  [types.USER_LOGIN_REQUEST]: () => ({ isLoading: true }),
  [types.USER_LOGIN_SUCCESS]: (_, action) => ({ isLoading: false, ...action.payload }),
  [types.USER_LOGIN_FAILURE]: (_, action) => ({ isLoading: false, error: action.error }),
});

export default authenticationReducers;
