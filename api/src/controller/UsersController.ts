import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import CreateRefreshToken from 'services/refreshToken/CreateRefreshToken';
import AuthenticateUserService from 'services/user/AuthenticateUserService';
import AuthenticateWithRefreshTokenService from 'services/user/AuthenticationWithRefreshTokenService';
import RegisterUserService from 'services/user/RegisterUserService';
import ShowUserInfoService from 'services/user/ShowUserInfoService';
import UpdateUserService from 'services/user/UpdateUserService';

export default class UsersController {
  async register(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      phone,
      password,
      type,
      zipCode,
      state,
      street,
      neighborhood,
      city,
      establishmentNumber,
    } = request.body;

    const registerUserService = new RegisterUserService();

    const user = await registerUserService.exec({
      name,
      email,
      phone,
      password,
      type,
      zipCode,
      state,
      street,
      neighborhood,
      city,
      establishmentNumber,
    });

    return response.status(200).json(instanceToPlain(user));
  }

  async authenticate(request: Request, response: Response): Promise<Response> {
    const { email, password, refreshToken } = request.body;

    let authenticateResponse;
    if (refreshToken) {
      const authenticateWithRefreshTokenService =
        new AuthenticateWithRefreshTokenService();
      authenticateResponse = await authenticateWithRefreshTokenService.exec(
        refreshToken,
      );
    } else {
      const authenticateUserService = new AuthenticateUserService();
      authenticateResponse = await authenticateUserService.exec({
        email,
        password,
      });
    }

    const createRefreshToken = new CreateRefreshToken();
    const refreshTokenResponse = await createRefreshToken.exec(
      authenticateResponse.userId,
    );
    const { session } = authenticateResponse;

    return response
      .status(200)
      .json({ ...session, refreshToken: refreshTokenResponse });
  }

  async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showUserInfoService = new ShowUserInfoService();

    const user = await showUserInfoService.exec(id);

    return response.status(200).json(instanceToPlain(user));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const {
      name,
      zipCode,
      state,
      street,
      neighborhood,
      city,
      establishmentNumber,
      profileImage,
    } = request.body;

    const updateUserService = new UpdateUserService();

    const user = await updateUserService.exec({
      id,
      city,
      establishmentNumber,
      profileImage,
      name,
      neighborhood,
      state,
      street,
      zipCode,
    });

    return response.status(200).json(instanceToPlain(user));
  }
}
