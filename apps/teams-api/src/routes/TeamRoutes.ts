import { Router } from 'express';
import { container } from 'tsyringe';
import { TeamController } from '../controllers/TeamController';

const router = Router();
const teamController = container.resolve(TeamController);

router.post('/teams', teamController.createTeam);
router.get('/teams/tag/:tag', teamController.getTeamsByTag);
router.get('/teams/search', teamController.searchTeamsByName);
router.get('/teams/tags', teamController.getAllTags);
router.post('/teams/:name/tags', teamController.addTagToTeamByName); 

export default router;