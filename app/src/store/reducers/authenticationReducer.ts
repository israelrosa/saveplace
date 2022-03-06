import { AuthenticationStore, types } from 'store/types/authenticationTypes';
import { createReducer } from '@reduxjs/toolkit';

const initialState: AuthenticationStore = {
  token: undefined,
  updateTokenTimerId: 0,
  isLoading: false,
  isLoggedIn: false,
  error: undefined,
};

const authenticationReducer = createReducer(initialState, {
  [types.USER_REGISTER_REQUEST]: () => ({ isLoading: true }),
  [types.USER_REGISTER_SUCCESS]: () => ({ isLoading: false }),
  [types.USER_REGISTER_FAILURE]: (_, action) => ({ isLoading: false, error: action.error }),
  [types.USER_LOGIN_REQUEST]: () => ({ isLoading: true, isLoggedIn: false }),
  [types.USER_LOGIN_SUCCESS]: (_, action) => ({
    isLoggedIn: true,
    isLoading: false,
    token: action.payload,
  }),
  [types.USER_LOGIN_FAILURE]: (_, action) => ({ isLoading: false, error: action.error }),
  [types.USER_LOGOUT_REQUEST]: (store) => ({ isLoading: true, ...store }),
  [types.USER_LOGOUT_SUCCESS]: () =>
    ({
      isLoggedIn: false,
      isLoading: false,
      token: undefined,
    }),
  [types.USER_LOGOUT_FAILURE]: (_, action) => ({ isLoading: false, error: action.error }),
  [types.USER_CLEAR_ERRORS]: (state) => ({ ...state, error: undefined }),
});

export default authenticationReducer;
