import { AxiosError } from 'axios';

export const types: { [id: string]: string } = {
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  AUTH_LOGIN: 'AUTH_LOGIN',

  USER_LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
  USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAILURE: 'USER_LOGIN_FAILURE',

  USER_REGISTER_REQUEST: 'USER_REGISTER_REQUEST',
  USER_REGISTER_SUCCESS: 'USER_REGISTER_SUCCESS',
  USER_REGISTER_FAILURE: 'USER_REGISTER_FAILURE',
};
interface Token {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}
export interface AuthenticationStore {
  token: Token;
  updateTokenTimerId: number;
  isLoading: boolean;
  isLoggedIn: boolean;
  error?: AxiosError;
}
