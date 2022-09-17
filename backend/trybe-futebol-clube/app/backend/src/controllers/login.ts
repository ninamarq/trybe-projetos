import { Request, Response, NextFunction } from 'express';
import jwt from '../helpers/jwt';
import Login from '../services/login';

export default class LoginController {
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const signIn = await Login.login(email, password);

      if (signIn === false) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }

      if (signIn === null || signIn === undefined) {
        return res.status(404).json({ message: 'Email not registered' });
      }

      return res.status(200).json(signIn);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        return res.status(400).json({ message: 'Invalid Token' });
      }

      const decryptedToken = await jwt.decryptToken(authorization);

      return res.status(200).json(decryptedToken.role);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
