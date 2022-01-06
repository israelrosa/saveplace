import { Request, Response } from 'express';
import CreateRefreshToken from 'services/refreshToken/CreateRefreshToken';
import AuthenticateUserService from 'services/user/AuthenticateUserService';
import AuthenticateWithRefreshTokenService from 'services/user/AuthenticationWithRefreshTokenService';
import RegisterUserService from 'services/user/RegisterUserService';

export default class UserController {
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

    const result = await registerUserService.exec({
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

    return response.status(200).json(result);
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
}
