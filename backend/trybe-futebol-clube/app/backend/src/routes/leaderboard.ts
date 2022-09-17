import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard';

const LeaderboardRouter = Router();

const controllers = new LeaderboardController();

LeaderboardRouter.get('/home', controllers.getHomeLeaderboard);

export default LeaderboardRouter;
