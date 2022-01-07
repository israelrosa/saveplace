import { EntityManager, getManager } from 'typeorm';
import ErrorHandler from 'utils/ErrorHandler';
import User from 'models/User';
import ERROR from '../../utils';

interface UserData {
  id: string;
  name?: string;
  profileImage?: string;
  zipCode?: string;
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

    this.entityManager.update(User, user, {
      name: data.name || user.name,
      profileImage: data.profileImage || user.profileImage,
      zipCode: data.zipCode || user.zipCode,
      state: data.state || user.state,
      street: data.street || user.street,
      neighborhood: data.neighborhood || user.neighborhood,
      city: data.city || user.city,
      establishmentNumber: data.establishmentNumber || user.establishmentNumber,
    });

    return user;
  }
}
