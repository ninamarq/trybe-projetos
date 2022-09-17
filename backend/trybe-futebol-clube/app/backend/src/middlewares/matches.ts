import { NextFunction, Request, Response } from 'express';
import { Teams } from '../database/models';

export const validateTeams = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { homeTeam, awayTeam } = req.body;
    const teamHome = await Teams.findOne({ where: { id: Number(homeTeam) } });
    const teamAway = await Teams.findOne({ where: { id: Number(awayTeam) } });

    if (!teamHome || !teamAway) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    if (homeTeam === awayTeam) {
      return res.status(401).json({ message: 'It is not possible to create a match with two equal teams' });
    }
    
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const validateInProgress = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { inProgress } = req.body;

    if (!inProgress) {
      return res.status(401).json({ message: 'This is not the route for finished matches' });
    }

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
