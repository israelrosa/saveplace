import { UserStore, types } from 'store/types/userTypes';
import { createReducer } from '@reduxjs/toolkit';

const initialState: UserStore = {
  data: undefined,
  isLoading: false,
  error: undefined,
};

const userReducer = createReducer(initialState, {
  [types.GET_USER_REQUEST]: () => ({ isLoading: true }),
  [types.GET_USER_SUCCESS]: (_, action) => ({
    isLoading: false,
    data: action.payload,
  }),
  [types.GET_USER_FAILURE]: (_, action) => ({ isLoading: false, error: action.error }),
});

export default userReducer;
