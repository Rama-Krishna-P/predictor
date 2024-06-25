import { autoInjectable, inject, injectable } from 'tsyringe';
import Prediction from '../models/Prediction';
import PredictionRepository from '../repositories/PredictionRepository';
import MatchRepository from '../repositories/MatchRepository';
import UserRepository from '../repositories/UserRepository';
import { PredictionDto } from 'shared-objects';
import User from '../models/User';

@autoInjectable()
class PredictionService {
  constructor(
    private predictionRepository: PredictionRepository,
    private matchRepository: MatchRepository,
    private userRepository: UserRepository
  ) {}

  async getOrCreatePredictionsForUser(userId: string): Promise<{ message: string } | Partial<PredictionDto>[]> {
    // Ensure user exists in the users table
    await this.userRepository.ensureUserExists(userId);

    // Fetch existing predictions for the user with match details
    const existingPredictions = await this.predictionRepository.findByUserId(userId);

    if (existingPredictions.length > 0) {
      return existingPredictions;
    }

    // Create predictions for future matches
    const futureMatches = await this.matchRepository.findFutureMatches();

    const predictions = futureMatches.map(match => ({
      matchId: match.id,
      userId,
    }));

    setImmediate(async () => await this.predictionRepository.createPredictions(predictions)) ;

    return { message: 'Predictions are being created' };
  }

  async updatePredictedTeamId(userId: string, matchId: number, predictedTeamId: string) {
    // Start a transaction
    return await Prediction.transaction(async (trx) => {
      // Fetch the match details
      const match = await this.matchRepository.findById(matchId);

      if (!match) {
        throw new Error('Match not found');
      }

      const now = new Date();
      const matchDateTime = new Date(match.matchDateTime)
      let updateData: Partial<Prediction> = { predictedTeamId };

      // Check if match datetime is in the future
      if (matchDateTime > now) {
        // Future match, just update the predicted team ID
        return await this.predictionRepository.updateByUserIdAndMatchId(userId, matchId, updateData, trx);
      } else {
        // Past match, check if windowOpened is true
        if (match.windowOpened) {
          // Update predicted team ID and penalty
          updateData.penalty = -5;
          return await this.predictionRepository.updateByUserIdAndMatchId(userId, matchId, updateData, trx);
        } else {
          throw new Error('Cannot update prediction for past match with closed window');
        }
      }
    });
  }
}

export default PredictionService;
