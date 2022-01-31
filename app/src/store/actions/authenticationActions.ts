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

export const register = (data: RegisterProps) => {
  function request() {
    return { type: types.USER_REGISTER_REQUEST };
  }
  function success() {
    return { type: types.USER_REGISTER_SUCCESS };
  }
  function failure(error: AxiosError) {
    return { type: types.USER_REGISTER_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    api
      .post('/users/', data)
      .then(() => {
        dispatch(success());
      })
      .catch((error) => {
        dispatch(failure(error.toString()));
      });
  };
};

export const login = (email, password) => {
  function request() {
    return { type: types.USER_LOGIN_REQUEST };
  }
  function success(user) {
    return { type: types.USER_LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: types.USER_LOGIN_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    api
      .post('/token/', { email, password })
      .then((user) => dispatch(success(user)))
      .catch((error) => dispatch(failure(error.toString())));
  };
};
