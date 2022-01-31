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

export interface AuthenticationStore {
  accessToken: string;
  refreshToken: string;
  updateTokenTimerId: number;
}
