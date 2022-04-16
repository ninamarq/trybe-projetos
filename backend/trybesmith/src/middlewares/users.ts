import { NextFunction, Request, Response } from 'express';

export const validateUsername = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    if (typeof username !== 'string') {
      return res.status(422).json({ error: 'Username must be a string' });
    }
    if (username.length <= 2) {
      return res.status(422).json({ error: 'Username must be longer than 2 characters' });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const validateClass = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { classe } = req.body;
    if (!classe) {
      return res.status(400).json({ error: 'Classe is required' });
    }
    if (typeof classe !== 'string') {
      return res.status(422).json({ error: 'Classe must be a string' });
    }
    if (classe.length <= 2) {
      return res.status(422).json({ error: 'Classe must be longer than 2 characters' });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const validateLevel = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { level } = req.body;
    console.log(level);
    if (level === undefined) {
      return res.status(400).json({ error: 'Level is required' });
    }
    if (typeof level !== 'number') {
      return res.status(422).json({ error: 'Level must be a number' });
    }
    if (level <= 0) {
      return res.status(422).json({ error: 'Level must be greater than 0' });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
    if (typeof password !== 'string') {
      return res.status(422).json({ error: 'Password must be a string' });
    }
    if (password.length < 8) {
      return res.status(422).json({ error: 'Password must be longer than 7 characters' });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};