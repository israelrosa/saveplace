import { Request, Response } from 'express';
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
}
