import User from 'models/User';
import { getManager, EntityManager } from 'typeorm';

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
    const user = await this.entityManager.create(User, data);
    const result = await this.entityManager.save(user);
    return result;
  }
}
