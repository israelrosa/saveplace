import { QueueStore, types } from 'store/types/queueTypes';
import { createReducer } from '@reduxjs/toolkit';

const initialState: QueueStore = {
  currentQueue: undefined,
  queueDetail: undefined,
  userQueues: [],
  publicQueues: [],
  isLoading: false,
  error: undefined,
};

const queueReducer = createReducer(initialState, {
  [types.GET_QUEUES_REQUEST]: (state) => ({ ...state, isLoading: true }),
  [types.GET_QUEUES_SUCCESS]: (state, action) => ({
    ...state,
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
  [types.GET_QUEUE_REQUEST]: (store) => ({ ...store, isLoading: true }),
  [types.GET_QUEUE_SUCCESS]: (store, action) => ({
    ...store,
    isLoading: false,
    queueDetail: action.payload,
  }),
  [types.GET_QUEUE_FAILURE]: (store, action) => ({
    isLoading: false,
    error: action.error,
    queueDetail: undefined,
    ...store
  }),
  [types.GET_CURRENT_QUEUE_REQUEST]: (store) => ({ ...store, isLoading: true }),
  [types.GET_CURRENT_QUEUE_SUCCESS]: (store, action) => ({
    ...store,
    isLoading: false,
    currentQueue: action.payload,
  }),
  [types.GET_CURRENT_QUEUE_FAILURE]: (store, action) => ({
    ...store,
    isLoading: false,
    error: action.error,
    currentQueue: undefined,
  }),
  [types.CREATE_QUEUE_REQUEST]: (store) => ({ ...store, isLoading: true }),
  [types.CREATE_QUEUE_SUCCESS]: (store, action) => ({
    ...store,
    isLoading: false,
    queueDetail: action.payload,
  }),
  [types.CREATE_QUEUE_FAILURE]: (store, action) => ({
    ...store,
    isLoading: false,
    error: action.error,
  }),
  [types.UPDATE_QUEUE_REQUEST]: (store) => ({ ...store, isLoading: true }),
  [types.UPDATE_QUEUE_SUCCESS]: (store) => ({
    ...store,
    isLoading: false,
  }),
  [types.UPDATE_QUEUE_FAILURE]: (store, action) => ({
    ...store,
    isLoading: false,
    error: action.error,
  }),
  [types.DELETE_QUEUE_REQUEST]: (store) => ({ ...store, isLoading: true }),
  [types.DELETE_QUEUE_SUCCESS]: (store) => ({
    ...store,
    isLoading: false,
    queueDetail: {},
  }),
  [types.DELETE_QUEUE_FAILURE]: (store, action) => ({
    ...store,
    isLoading: false,
    error: action.error,
  }),
  [types.CALL_NEXT_CLIENT_REQUEST]: (store) => ({ ...store, isLoading: true }),
  [types.CALL_NEXT_CLIENT_SUCCESS]: (store) => ({
    ...store,
    isLoading: false,
  }),
  [types.CALL_NEXT_CLIENT_FAILURE]: (store, action) => ({
    ...store,
    isLoading: false,
    error: action.error,
  }),
  [types.JOIN_QUEUE_REQUEST]: (store) => ({ ...store, isLoading: true }),
  [types.JOIN_QUEUE_SUCCESS]: (store, action) => ({
    ...store,
    isLoading: false,
    currentQueue: action.payload,
  }),
  [types.JOIN_QUEUE_FAILURE]: (store, action) => ({
    ...store,
    isLoading: false,
    error: action.error,
  }),
  [types.QUIT_QUEUE_REQUEST]: (store) => ({ ...store, isLoading: true }),
  [types.QUIT_QUEUE_SUCCESS]: (store) => ({
    ...store,
    isLoading: false,
    currentQueue: undefined,
    queueDetail: undefined,
  }),
  [types.QUIT_QUEUE_FAILURE]: (store, action) => ({
    ...store,
    isLoading: false,
    error: action.error,
  }),
  [types.CLEAR_QUEUE_ERROR]: (store) => ({
    ...store,
    error: undefined,
  }),
});

export default queueReducer;
