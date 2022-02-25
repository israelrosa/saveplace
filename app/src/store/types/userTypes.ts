import { AxiosError } from 'axios';

export const types: { [id: string]: string } = {
  GET_USER_REQUEST: 'GET_USER_REQUEST',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAILURE: 'GET_USER_FAILURE',
};

interface User {
  name: string;
}

export interface UserStore {
  data: User;
  isLoading: boolean;
  error?: AxiosError;
}
