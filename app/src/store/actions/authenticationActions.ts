import { AxiosError } from 'axios';
import api from 'services/api';
import { types } from 'store/types/authenticationTypes';

interface RegisterProps {
  name: string;
  email: string;
  phone: string;
  password: string;
  type: string;
  zipCode?: string;
  state?: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  establishmentNumber?: string;
}

export const register = (data: RegisterProps) => (dispatch) =>
  new Promise((resolve, reject) => {
    function request() {
      return { type: types.USER_REGISTER_REQUEST };
    }
    function success() {
      return { type: types.USER_REGISTER_SUCCESS };
    }
    function failure(error: AxiosError) {
      return { type: types.USER_REGISTER_FAILURE, error };
    }
    dispatch(request());

    api
      .post('/users/', data)
      .then(() => {
        dispatch(success());
        resolve();
      })
      .catch((error) => {
        dispatch(failure(error.toString()));
        reject();
      });
  });

export const login = (email, password) => {
  function request() {
    return { type: types.USER_LOGIN_REQUEST };
  }
  function success(payload) {
    return { type: types.USER_LOGIN_SUCCESS, payload };
  }
  function failure(error) {
    return { type: types.USER_LOGIN_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    api
      .post('/token/', { email, password })
      .then((user) => {
        const { accessToken, tokenType } = user.data;
        const authorizationToken = `${tokenType} ${accessToken}`;
        return dispatch(success({ ...user.data, authorizationToken }));
      })
      .catch((error: AxiosError) => {
        const errorMessage = error.response?.data.id || error.message;
        return dispatch(failure(errorMessage));
      });
  };
};

export const logout = () => {
  function request() {
    return { type: types.USER_LOGOUT_REQUEST };
  }
  function success() {
    return { type: types.USER_LOGOUT_SUCCESS };
  }
  function failure(error) {
    return { type: types.USER_LOGOUT_FAILURE, error };
  }

  return (dispatch, getState) => {
    dispatch(request());

    api
      .post(
        '/revoke/',
        { refreshToken: getState().auth.token.refreshToken },
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

export const clearAuthErrors = () => (dispatch) => {
  dispatch({ type: types.USER_CLEAR_ERRORS });
};
