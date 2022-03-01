import { TagStore, types } from 'store/types/tagTypes';
import { createReducer } from '@reduxjs/toolkit';

const initialState: TagStore = {
  data: undefined,
  isLoading: false,
  error: undefined,
};

const tagReducer = createReducer(initialState, {
  [types.GET_TAGS_REQUEST]: () => ({ isLoading: true }),
  [types.GET_TAGS_SUCCESS]: (_, action) => ({
    isLoading: false,
    data: action.payload,
  }),
  [types.GET_TAGS_FAILURE]: (_, action) => ({ isLoading: false, error: action.error }),
});

export default tagReducer;
