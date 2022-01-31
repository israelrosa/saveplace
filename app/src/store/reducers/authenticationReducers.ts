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
  [types.USER_REGISTER_SUCCESS]: (action) => action.payload,
  [types.USER_REGISTER_FAILURE]: (action) => ({ isLoading: false, error: action.error }),
  [types.USER_LOGIN_REQUEST]: () => ({ isLoading: true }),
  [types.USER_LOGIN_SUCCESS]: (action) => action.payload,
  [types.USER_LOGIN_FAILURE]: (action) => ({ isLoading: false, error: action.error }),
});

export default authenticationReducers;
