import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import PredictionService from '../services/PredictionService';

@injectable()
class PredictionController {
  constructor(@inject(PredictionService) private predictionService: PredictionService) {}
  
  getPredictionsForUser = async (req: Request, res: Response) => {
    try {
      const userId: string = req.userId;
      const result = await this.predictionService.getOrCreatePredictionsForUser(userId);

      if ('message' in result) {
        return res.status(200).json({ message: result.message });
      }

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  updatePredictedTeamId = async (req: Request, res: Response) => {
    try {
      const userId: string = req.userId;
      const { matchId, predictedTeamId } = req.body;

      if (!matchId || !predictedTeamId) {
        return res.status(400).json({ error: 'matchId and predictedTeamId are required' });
      }

      const updatedPrediction = await this.predictionService.updatePredictedTeamId(userId, matchId, predictedTeamId);
      res.status(200).json(updatedPrediction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // createPrediction = async (req: Request, res: Response) => {
  //   try {
  //     const prediction = await this.predictionService.createPrediction(req.body);
  //     res.status(201).json(prediction);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // };

  // getPredictions = async (req: Request, res: Response) => {
  //   try {
  //     const predictions = await this.predictionService.getPredictions();
  //     res.status(200).json(predictions);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // };

  // getPredictionById = async (req: Request, res: Response) => {
  //   try {
  //     const { matchId, userId } = req.params;
  //     const prediction = await this.predictionService.getPredictionById(Number(matchId), userId);
  //     res.status(200).json(prediction);
  //   } catch (error) {
  //     res.status(404).json({ error: error.message });
  //   }
  // };

  // updatePrediction = async (req: Request, res: Response) => {
  //   try {
  //     const { matchId, userId } = req.params;
  //     const prediction = await this.predictionService.updatePrediction(Number(matchId), userId, req.body);
  //     res.status(200).json(prediction);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // };

  // deletePrediction = async (req: Request, res: Response) => {
  //   try {
  //     const { matchId, userId } = req.params;
  //     await this.predictionService.deletePrediction(Number(matchId), userId);
  //     res.status(204).send();
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // };
}

export default PredictionController;
