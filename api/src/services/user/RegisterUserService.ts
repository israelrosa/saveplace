import User from 'models/User';
import { getManager, EntityManager } from 'typeorm';
import ErrorHandler from 'utils/ErrorHandler';
import ERROR from 'utils';

interface RegisterUserData {
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

export default class RegisterUserService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec(data: RegisterUserData): Promise<User> {
    const validTypes = ['client', 'establishment'];
    if (!validTypes.includes(data.type)) {
      throw new ErrorHandler(ERROR.INVALID_USER_TYPE);
    }
    if (data.type === 'establishment') {
      const {
        zipCode,
        state,
        street,
        neighborhood,
        city,
        establishmentNumber,
      } = data;

      if (
        !zipCode ||
        !state ||
        !street ||
        !neighborhood ||
        !city ||
        !establishmentNumber
      ) {
        throw new ErrorHandler(ERROR.INVALID_USER);
      }
    }
    const user = await this.entityManager.create(User, data);
    const result = await this.entityManager.save(user);
    return result;
  }
}
