import { Router } from 'express';
import { validateInProgress } from '../middlewares/matches';
import { validateTeams } from '../middlewares/matches';
import MatchesController from '../controllers/matches';

const MatchesRouter = Router();

const controllers = new MatchesController();

const validateCreateInProgressMatches = [
  validateTeams,
  validateInProgress,
];

MatchesRouter.get('/', controllers.getMatches);
MatchesRouter.post('/', validateCreateInProgressMatches, controllers.create);
MatchesRouter.patch('/:id/finish', controllers.finishMatch);
MatchesRouter.patch('/:id', controllers.editMatch);

export default MatchesRouter;
