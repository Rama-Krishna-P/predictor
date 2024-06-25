import { Model, JSONSchema } from 'objection';

export class Team extends Model {
  static tableName = 'teams';

  id!: string;
  name!: string;
  shortName!: string;
  logo!: string;
  tags!: string[];
  archived!: boolean;

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: ['name', 'shortName', 'logo'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string', minLength: 1 },
        shortName: { type: 'string', minLength: 1 },
        logo: { type: 'string', minLength: 1 },
        tags: { type: 'array', items: { type: 'string' } },
        archived: { type: 'boolean', default: false }
      },
      additionalProperties: false
    };
  }
}
