import { Model } from 'objection';

class User extends Model {
  static tableName = 'users';

  id!: string;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', format: 'uuid' }
      }
    };
  }
}

export default User;
