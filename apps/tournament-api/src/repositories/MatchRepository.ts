import { Transaction } from 'objection';
import BaseRepository from './BaseRepository';
import Match from '../models/Match';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
class MatchRepository extends BaseRepository<Match> {
  constructor() {
    super(Match);
  }

  findFutureMatches(): Promise<Match[]> {
    return this.modelClass.query()
      .where('matchDateTime', '>', new Date().toISOString())
      .orderBy('matchDateTime', 'asc') as unknown as Promise<Match[]>;
  }

  findByDateTimeAndTeams(dateTime: Date, homeTeamId: string, awayTeamId: string): Promise<Match | undefined> {
    return this.modelClass.query()
      .where('homeTeamId', homeTeamId)
      .andWhere('awayTeamId', awayTeamId)
      .andWhere('matchDateTime', dateTime)
      .first() as unknown as Promise<Match | undefined>;
  }

  async getMaxMatchNo(): Promise<number> {
    const result = await this.modelClass.query().max('matchNo as maxMatchNo').first() as any;
    return result ? result.maxMatchNo : 0;
  }

  async getMatchesWithoutWinner(): Promise<Match[]> {
    return this.modelClass.query().whereNull('winnerTeamId').orderBy('matchDateTime', 'asc') as unknown as Promise<Match[]>; 
  }
}

export default MatchRepository;
