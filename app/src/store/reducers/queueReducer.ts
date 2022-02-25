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
  [types.GET_QUEUE_REQUEST]: () => ({ isLoading: true }),
  [types.GET_QUEUE_SUCCESS]: (_, action) => ({
    isLoading: false,
    queueDetail: action.payload,
  }),
  [types.GET_QUEUE_FAILURE]: (_, action) => ({ isLoading: false, error: action.error }),
  [types.CREATE_QUEUE_REQUEST]: () => ({ isLoading: true }),
  [types.CREATE_QUEUE_SUCCESS]: (_, action) => ({
    isLoading: false,
    queueDetail: action.payload,
  }),
  [types.CREATE_QUEUE_FAILURE]: (_, action) => ({ isLoading: false, error: action.error }),
});

export default queueReducer;
