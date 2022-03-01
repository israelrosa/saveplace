import { QueueStore, types } from 'store/types/queueTypes';
import { createReducer } from '@reduxjs/toolkit';

const initialState: QueueStore = {
  data: undefined,
  isLoading: false,
  error: undefined,
};

const queueReducer = createReducer(initialState, {
  [types.GET_QUEUES_REQUEST]: () => ({ isLoading: true }),
  [types.GET_QUEUES_SUCCESS]: (_, action) => ({
    isLoading: false,
    publicQueues: action.payload,
  }),
  [types.GET_QUEUES_FAILURE]: (_, action) => ({ isLoading: false, error: action.error }),
  [types.GET_USER_QUEUES_REQUEST]: () => ({ isLoading: true }),
  [types.GET_USER_QUEUES_SUCCESS]: (_, action) => ({
    isLoading: false,
    userQueues: action.payload,
  }),
  [types.GET_USER_QUEUES_FAILURE]: (_, action) => ({ isLoading: false, error: action.error }),
  [types.GET_QUEUE_REQUEST]: (store) => ({ isLoading: true, ...store }),
  [types.GET_QUEUE_SUCCESS]: (store, action) => ({
    isLoading: false,
    queueDetail: action.payload,
    ...store
  }),
  [types.GET_QUEUE_FAILURE]: (store, action) => ({
    isLoading: false,
    error: action.error,
    queueDetail: undefined,
    ...store
  }),
  [types.GET_CURRENT_QUEUE_REQUEST]: (store) => ({ isLoading: true, ...store }),
  [types.GET_CURRENT_QUEUE_SUCCESS]: (store, action) => ({
    isLoading: false,
    currentQueue: action.payload,
    ...store
  }),
  [types.GET_CURRENT_QUEUE_FAILURE]: (store, action) => ({
    isLoading: false,
    error: action.error,
    currentQueue: undefined,
    ...store
  }),
  [types.CREATE_QUEUE_REQUEST]: (store) => ({ isLoading: true, ...store }),
  [types.CREATE_QUEUE_SUCCESS]: (store, action) => ({
    isLoading: false,
    queueDetail: action.payload,
    ...store
  }),
  [types.CREATE_QUEUE_FAILURE]: (store, action) => ({
    isLoading: false,
    error: action.error,
    ...store
  }),
});

export default queueReducer;
