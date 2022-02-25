import api from 'services/api';
import { types } from 'store/types/queueTypes';

interface QueueQueries {
  search?: string;
  tagId?: string;
  skip: number;
  limit: number;
}

interface CreateQueueParams {
  name: string;
  status: string;
  tagId: string;
}

export const getQueues = ({ search, tagId, limit, skip }: QueueQueries) => {
  function request() {
    return { type: types.GET_QUEUES_REQUEST };
  }
  function success(payload) {
    return { type: types.GET_QUEUES_SUCCESS, payload };
  }
  function failure(error) {
    return { type: types.GET_QUEUES_FAILURE, error };
  }

  return (dispatch, getState) => {
    dispatch(request());

    api
      .get('/queues/', {
        params: {
          search,
          tagId,
          limit,
          skip,
        },
        headers: {
          Authorization: getState().auth.token.authorizationToken,
        },
      })
      .then((user) => dispatch(success(user.data)))
      .catch((error) => dispatch(failure(error.toString())));
  };
};

export const getUserQueues = () => {
  function request() {
    return { type: types.GET_USER_QUEUES_REQUEST };
  }
  function success(payload) {
    return { type: types.GET_USER_QUEUES_SUCCESS, payload };
  }
  function failure(error) {
    return { type: types.GET_USER_QUEUES_FAILURE, error };
  }

  return (dispatch, getState) => {
    dispatch(request());

    api
      .get(
        '/users/queues/',
        {},
        {
          headers: {
            Authorization: getState().auth.token.authorizationToken,
          },
        }
      )
      .then((user) => dispatch(success(user.data)))
      .catch((error) => dispatch(failure(error.toString())));
  };
};

export const getQueue = (queueId: string) => {
  function request() {
    return { type: types.GET_QUEUE_REQUEST };
  }
  function success(payload) {
    return { type: types.GET_QUEUE_SUCCESS, payload };
  }
  function failure(error) {
    return { type: types.GET_QUEUE_FAILURE, error };
  }

  return (dispatch, getState) => {
    dispatch(request());

    api
      .get(
        `/queues/${queueId}`,
        {},
        {
          headers: {
            Authorization: getState().auth.token.authorizationToken,
          },
        }
      )
      .then((user) => dispatch(success(user.data)))
      .catch((error) => dispatch(failure(error.toString())));
  };
};

export const createQueue = ({ name, status, tagId }: CreateQueueParams) => {
  function request() {
    return { type: types.CREATE_QUEUE_REQUEST };
  }
  function success(payload) {
    return { type: types.CREATE_QUEUE_SUCCESS, payload };
  }
  function failure(error) {
    return { type: types.CREATE_QUEUE_FAILURE, error };
  }

  return (dispatch, getState) => {
    dispatch(request());

    api
      .post(
        '/queues/',
        { name, status, tagId },
        {
          headers: {
            Authorization: getState().auth.token.authorizationToken,
          },
        }
      )
      .then((user) => dispatch(success(user.data)))
      .catch((error) => dispatch(failure(error.toString())));
  };
};

export const deleteQueue = (queueId: string) => {
  function request() {
    return { type: types.DELETE_QUEUE_REQUEST };
  }
  function success(payload) {
    return { type: types.DELETE_QUEUE_SUCCESS, payload };
  }
  function failure(error) {
    return { type: types.DELETE_QUEUE_FAILURE, error };
  }

  return (dispatch, getState) => {
    dispatch(request());

    api
      .delete(
        `/queues/${queueId}`,
        {},
        {
          headers: {
            Authorization: getState().auth.token.authorizationToken,
          },
        }
      )
      .then(() => dispatch(success()))
      .catch((error) => dispatch(failure(error.toString())));
  };
};
