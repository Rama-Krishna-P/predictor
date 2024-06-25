import { Transaction } from 'objection';
import BaseRepository from './BaseRepository';
import Prediction from '../models/Prediction';
import { autoInjectable } from 'tsyringe';
import { PredictionDto } from 'shared-objects';

@autoInjectable()
class PredictionRepository extends BaseRepository<Prediction> {
  constructor() {
    super(Prediction);
  }

  findByUserId(userId: string): Promise<PredictionDto[]> {
    return this.modelClass.query()
      .where('userId', userId)
      .withGraphFetched('match')
      .modifyGraph('match', builder => {
        builder.select('id', 'homeTeamId', 'awayTeamId', 'matchNo', 'city', 'stadium');
      }) as unknown as Promise<PredictionDto[]>;
  }

  async createPredictions(predictions: Partial<Prediction>[], trx?: Transaction): Promise<Prediction[]> {
    return trx ? await Promise.all(predictions.map(prediction => this.modelClass.query(trx).insert(prediction))) as Prediction[]
               : await Promise.all(predictions.map(prediction => this.modelClass.query().insert(prediction))) as Prediction[];
  }

  updateByUserIdAndMatchId(userId: string, matchId: number, data: Partial<Prediction>, trx?: Transaction): Promise<Prediction> {
    return this.modelClass.query(trx)
      .where({ userId, matchId })
      .patch(data) as unknown as Promise<Prediction>;
  }
}

export default PredictionRepository;
