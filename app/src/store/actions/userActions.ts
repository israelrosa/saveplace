import api from 'services/api';
import { types } from 'store/types/userTypes';

export const getUserInfo = () => {
  function request() {
    return { type: types.GET_USER_REQUEST };
  }
  function success(payload) {
    return { type: types.GET_USER_SUCCESS, payload };
  }
  function failure(error) {
    return { type: types.GET_USER_FAILURE, error };
  }

  return (dispatch, getState) => {
    dispatch(request());

    api
      .get('/users/', {
        headers: {
          Authorization: getState().auth.token.authorizationToken,
        },
      })
      .then((user) => dispatch(success(user.data)))
      .catch((error) => dispatch(failure(error.toString())));
  };
};
