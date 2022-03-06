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
      .then((queues) => dispatch(success(queues.data)))
      .catch((error) => dispatch(failure(error.toString())));
  };
};

export const getUserQueues = (status) => {
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
        {
          params: {
            status
          },
          headers: {
            Authorization: getState().auth.token.authorizationToken,
          },
        }
      )
      .then((queues) => dispatch(success(queues.data)))
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
        {
          headers: {
            Authorization: getState().auth.token.authorizationToken,
          },
        }
      )
      .then((queue) => dispatch(success(queue.data)))
      .catch((error) => dispatch(failure(error.toString())));
  };
};

export const getCurrentQueue = () => {
  function request() {
    return { type: types.GET_CURRENT_QUEUE_REQUEST };
  }
  function success(payload) {
    return { type: types.GET_CURRENT_QUEUE_SUCCESS, payload };
  }
  function failure(error) {
    return { type: types.GET_CURRENT_QUEUE_FAILURE, error };
  }

  return (dispatch, getState) => {
    dispatch(request());

    api
      .get(
        '/clients/',
        {
          headers: {
            Authorization: getState().auth.token.authorizationToken,
          },
        }
      )
      .then((queue) => dispatch(success(queue.data)))
      .catch((error) => dispatch(failure(error.toString())));
  };
};

export const createQueue = ({ name, status, tagId }: CreateQueueParams) =>
  (dispatch, getState) => new Promise((resolve, reject) => {
    function request() {
      return { type: types.CREATE_QUEUE_REQUEST };
    }
    function success(payload) {
      return { type: types.CREATE_QUEUE_SUCCESS, payload };
    }
    function failure(error) {
      return { type: types.CREATE_QUEUE_FAILURE, error };
    }

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
      .then((queue) => {
        resolve(queue.data.id);
        return dispatch(success(queue.data));
      })
      .catch((error) => {
        reject(error);
        return dispatch(failure(error.toString()));
      });
  });

export const updateQueue = ({ queueId, name, status, tagId }: CreateQueueParams) =>
  (dispatch, getState) => {
    function request() {
      return { type: types.UPDATE_QUEUE_REQUEST };
    }
    function success() {
      return { type: types.UPDATE_QUEUE_SUCCESS };
    }
    function failure(error) {
      return { type: types.UPDATE_QUEUE_FAILURE, error };
    }

    return new Promise((resolve, reject) => {
      dispatch(request());

      api
        .put(
          `/queues/${queueId}/`,
          { name, status, tagId },
          {
            headers: {
              Authorization: getState().auth.token.authorizationToken,
            },
          }
        )
        .then(() => {
          resolve();
          return dispatch(success());
        })
        .catch((error) => {
          reject(error);
          return dispatch(failure(error.toString()));
        });
    });
  };

export const deleteQueue = (queueId: string) => {
  function request() {
    return { type: types.DELETE_QUEUE_REQUEST };
  }
  function success() {
    return { type: types.DELETE_QUEUE_SUCCESS };
  }
  function failure(error) {
    return { type: types.DELETE_QUEUE_FAILURE, error };
  }

  return (dispatch, getState) => {
    dispatch(request());

    api
      .delete(
        `/queues/${queueId}`,
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

export const callNextClient = (queueId: string) => (dispatch, getState) => {
  function request() {
    return { type: types.CALL_NEXT_CLIENT_REQUEST };
  }
  function success(payload) {
    return { type: types.CALL_NEXT_CLIENT_SUCCESS, payload };
  }
  function failure(error) {
    return { type: types.CALL_NEXT_CLIENT_FAILURE, error };
  }

  return new Promise((resolve, reject) => {
    dispatch(request());

    api
      .patch(
        `/queues/${queueId}/actions/call/next/`,
        {},
        {
          headers: {
            Authorization: getState().auth.token.authorizationToken,
          },
        }
      )
      .then(() => {
        resolve();
        return dispatch(success());
      })
      .catch((error) => {
        reject(error);
        return dispatch(failure(error.toString()));
      });
  });
};

export const joinQueue = (queueId: string) => (dispatch, getState) => {
  function request() {
    return { type: types.JOIN_QUEUE_REQUEST };
  }
  function success(payload) {
    return { type: types.JOIN_QUEUE_SUCCESS, payload };
  }
  function failure(error) {
    return { type: types.JOIN_QUEUE_FAILURE, error };
  }

  return new Promise((resolve, reject) => {
    dispatch(request());

    api
      .post(
        '/clients/',
        { queueId },
        {
          headers: {
            Authorization: getState().auth.token.authorizationToken,
          },
        }
      )
      .then(({ data }) => {
        resolve();
        return dispatch(success(data));
      })
      .catch((error) => {
        reject(error);
        return dispatch(failure(error.toString()));
      });
  });
};

export const quitQueue = (queueClientId: string) => (dispatch, getState) => {
  function request() {
    return { type: types.QUIT_QUEUE_REQUEST };
  }
  function success(payload) {
    return { type: types.QUIT_QUEUE_SUCCESS, payload };
  }
  function failure(error) {
    return { type: types.QUIT_QUEUE_FAILURE, error };
  }

  return new Promise((resolve, reject) => {
    dispatch(request());

    api
      .patch(
        `/clients/${queueClientId}/actions/quit/`,
        {},
        {
          headers: {
            Authorization: getState().auth.token.authorizationToken,
          },
        }
      )
      .then(() => {
        resolve();
        return dispatch(success());
      })
      .catch((error) => {
        reject(error);
        return dispatch(failure(error.toString()));
      });
  });
};

export const clearQueueError = () => (dispatch) => dispatch({ type: types.CLEAR_QUEUE_ERROR });
