import { Model } from 'objection';
import Match from './Match';

class Prediction extends Model {
  static tableName = 'predictions';

  matchId!: number;
  predictedTeamId!: string | null;
  userId!: string;
  penalty!: number | null;
  points!: number | null;
  bonus!: number | null;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'matchId'],
      properties: {
        id: { type: 'integer' },
        userId: { type: 'string' },
        matchId: { type: 'integer' },
        predictedTeamId: { type: ['string', 'null'] },
        penalty: { type: ['number', 'null'] },
        points: { type: ['number', 'null'] },
        bonus: { type: ['number', 'null'] }
      },
      uniqueItems: true, // Unique constraint for userId and matchId combination
    };
  }

  static get relationMappings() {
    return {
      match: {
        relation: Model.BelongsToOneRelation,
        modelClass: Match,
        join: {
          from: 'predictions.matchId',
          to: 'matches.id'
        }
      }
    };
  }
}

export default Prediction;