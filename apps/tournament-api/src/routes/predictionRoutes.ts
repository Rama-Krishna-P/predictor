import { Router } from 'express';
import { container } from 'tsyringe';
import PredictionController from '../controllers/PredictionController';
import extractUserId from '../middleware/ExtractUserId';

const router = Router();
const predictionController = container.resolve(PredictionController);

router.get('', extractUserId, predictionController.getPredictionsForUser);
router.put('/predictTeam', extractUserId, predictionController.updatePredictedTeamId);
// router.post('/', predictionController.createPrediction);
// router.get('/', predictionController.getPredictions);
// router.get('/:matchId/:userId', predictionController.getPredictionById);
// router.put('/:matchId/:userId', predictionController.updatePrediction);
// router.delete('/:matchId/:userId', predictionController.deletePrediction);

export default router;
