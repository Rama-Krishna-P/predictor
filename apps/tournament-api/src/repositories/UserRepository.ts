import BaseRepository from './BaseRepository';
import User from '../models/User';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  async ensureUserExists(userId: string): Promise<void> {
    const user = await this.modelClass.query().findById(userId) as unknown as Promise<User>;
    if (!user) {
      await this.modelClass.query().insert({ id: userId });
    }
  }
}

export default UserRepository;
