import { Router } from 'express';
import { container } from 'tsyringe';
import MatchController from '../controllers/MatchController';

const router = Router();
const matchController = container.resolve(MatchController);

router.post('/', matchController.createMatch);
router.patch('/:id/winner', matchController.updateWinnerTeamId);
router.patch('/:id/window', matchController.updateWindowOpened);
router.get('/without-winner', matchController.getMatchesWithoutWinner); 

// router.get('/', matchController.getMatches);
// router.get('/:id', matchController.getMatchById);
// router.put('/:id', matchController.updateMatch);
// router.delete('/:id', matchController.deleteMatch);

export default router;
