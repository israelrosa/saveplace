import api from 'services/api';
import { types } from 'store/types/tagTypes';

export const getTags = () => {
  function request() {
    return { type: types.GET_TAGS_REQUEST };
  }
  function success(payload) {
    return { type: types.GET_TAGS_SUCCESS, payload };
  }
  function failure(error) {
    return { type: types.GET_TAGS_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    api
      .get('/tags/')
      .then((tags) => dispatch(success(tags.data)))
      .catch((error) => dispatch(failure(error.toString())));
  };
};
