import { Request, Response, NextFunction } from 'express';
import Leaderboard from '../services/leaderboard';

export default class LeaderboardController {
  public getHomeLeaderboard = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboard = await Leaderboard.getHome();

      return res.status(200).json(leaderboard);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
