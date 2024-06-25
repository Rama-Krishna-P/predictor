import { autoInjectable, inject, injectable } from 'tsyringe';
import Match from '../models/Match';
import { MatchDto } from 'shared-objects'
import MatchRepository from '../repositories/MatchRepository';
import UserRepository from '../repositories/UserRepository';
import PredictionService from './PredictionService';

interface MaxMatchNo {
  maxMatchNo: number
}

@autoInjectable()
class MatchService {
  constructor(
    private matchRepository: MatchRepository,
    private userRepository: UserRepository,
    private predictionService: PredictionService
  ) {}

  async createMatch(matchData: MatchDto): Promise<Partial<Match>> {
    const existingMatch = await this.matchRepository.findByDateTimeAndTeams(matchData.matchDateTime!, matchData.homeTeamId!, matchData.awayTeamId!);

    if (existingMatch) {
      throw new Error('Match between the same teams at the same time already exists.');
    }

    const maxMatchNo = await this.matchRepository.getMaxMatchNo();
    matchData.matchNo = (maxMatchNo ?? 0) + 1;

    const match = await this.matchRepository.create(matchData);

    setImmediate(async () => await this.predictionService.createPredictionsForAllUsers(match.id));

    return match
  }

  async updateWinnerTeamId(id: number, winnerTeamId: string | null): Promise<Match> {
    return this.matchRepository.updateById(id, { winnerTeamId });
  }

  async updateWindowOpened(id: number, windowOpened: boolean): Promise<Match> {
    return this.matchRepository.updateById(id, { windowOpened } )
  }

  async getMatchesWithoutWinner(): Promise<Match[]> {
    return this.matchRepository.getMatchesWithoutWinner()
  }
  
  // async getMatches(): Promise<Match[]> {
  //   return Match.query();
  // }

  // async getMatchById(id: number): Promise<Match> {
  //   return Match.query().findById(id);
  // }

  // async updateMatch(id: number, matchData: Partial<MatchDto>): Promise<Match> {
  //   return Match.query().patchAndFetchById(id, matchData);
  // }

  // async deleteMatch(id: number): Promise<void> {
  //   await Match.query().deleteById(id);
  // }
}

export default MatchService;
