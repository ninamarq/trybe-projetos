import { Router } from 'express';

import UsersControllers from '../controllers/users';

import {
  validateClass, validateLevel,
  validatePassword, validateUsername,
} from '../middlewares/users';

const UsersRouter = Router();

const usersControllers = new UsersControllers();

const middlewaresPostUser = [
  validateClass, validateLevel,
  validatePassword, validateUsername,
];

UsersRouter.post('/users', middlewaresPostUser, usersControllers.createUser);

export default UsersRouter;