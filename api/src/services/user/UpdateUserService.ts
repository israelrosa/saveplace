import { EntityManager, getManager } from 'typeorm';
import ErrorHandler from '../../utils/ErrorHandler';
import User from '../../models/User';
import ERROR, { log } from '../../utils';

interface UserData {
  id: string;
  name?: string;
  profileImage?: string;
  cep?: string;
  state?: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  establishmentNumber?: string;
}

export default class UpdateUserService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec(data: UserData): Promise<User> {
    const user = await this.entityManager.findOne(User, data.id);

    if (!user) {
      throw new ErrorHandler(ERROR.USER_NOT_FOUND);
    }

    try {
      this.entityManager.update(User, user, {
        name: data.name || user.name,
        profileImage: data.profileImage || user.profileImage,
        cep: data.cep || user.cep,
        state: data.state || user.state,
        street: data.street || user.street,
        neighborhood: data.neighborhood || user.neighborhood,
        city: data.city || user.city,
        establishmentNumber:
          data.establishmentNumber || user.establishmentNumber,
      });
    } catch {
      throw new ErrorHandler(ERROR.DATABASE_ERROR);
    }

    log.info(`User ${user.id} was updated`);

    return user;
  }
}
