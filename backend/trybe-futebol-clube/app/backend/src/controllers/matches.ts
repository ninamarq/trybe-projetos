import { Request, Response, NextFunction } from 'express';
import MatchesClass from '../services/matches';

export default class MatchesController {
  public getMatches = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const allMatches = await MatchesClass.getMatches();

      return res.status(200).json(allMatches);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress
      } = req.body;

      const newMatch = await MatchesClass.createMatch({
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress
      });
      
      return res.status(201).json(newMatch);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public finishMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await MatchesClass.finishMatch(Number(id));
      return res.status(200).json({
        message: 'Match was finished',
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public editMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      await MatchesClass.editMatch(Number(id), homeTeamGoals, awayTeamGoals);
      return res.status(200).json({
        message: 'Match was edited',
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
