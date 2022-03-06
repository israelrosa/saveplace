import { getManager, EntityManager } from 'typeorm';
import User from '../../models/User';
import ErrorHandler from '../../utils/ErrorHandler';
import ERROR, { log } from '../../utils';

interface RegisterUserData {
  name: string;
  email: string;
  phone: string;
  password: string;
  type: string;
  cep?: string;
  state?: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  establishmentNumber?: string;
  complement?: string;
  longitude?: string;
  latitude?: string;
}

export default class RegisterUserService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec(data: RegisterUserData): Promise<User> {
    const userAlreadyExists = await this.entityManager.findOne(User, {
      where: { email: data.email },
    });

    if (userAlreadyExists) {
      throw new ErrorHandler(ERROR.USER_ALREADY_EXISTS);
    }

    const validTypes = ['client', 'establishment'];
    if (!validTypes.includes(data.type)) {
      throw new ErrorHandler(ERROR.INVALID_USER_TYPE);
    }
    if (data.type === 'establishment') {
      const { cep, state, street, neighborhood, city, establishmentNumber } =
        data;

      if (
        !cep ||
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
    log.info(`User ${result.id} created with success!`);
    return result;
  }
}
