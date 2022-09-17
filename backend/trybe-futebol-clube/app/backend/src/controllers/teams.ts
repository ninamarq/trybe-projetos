import { Request, Response, NextFunction } from 'express';
import TeamsClass from '../services/teams';

export default class TeamsController {
  public getTeams = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const allTeams = await TeamsClass.getTeams();

      return res.status(200).json(allTeams);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getTeamById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const team = await TeamsClass.getTeamById(Number(id));
      return res.status(200).json(team);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
