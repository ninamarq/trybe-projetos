import { Router } from 'express';
import TeamsController from '../controllers/teams';

const TeamsRouter = Router();

const controllers = new TeamsController();

TeamsRouter.get('/', controllers.getTeams);
TeamsRouter.get('/:id', controllers.getTeamById);

export default TeamsRouter;
