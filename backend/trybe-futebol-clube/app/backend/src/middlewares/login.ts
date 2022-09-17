import { NextFunction, Request, Response } from 'express';

export const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    const testEmail = emailRegex.test(email);

    if (!email || email.length === 0) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!testEmail) {
      return res.status(401).json({ message: 'Incorrect email or password' });
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

    if (!password || password.length === 0) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
