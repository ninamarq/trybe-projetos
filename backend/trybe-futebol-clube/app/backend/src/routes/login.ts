import { Router } from 'express';
import { validatePassword, validateEmail } from '../middlewares/login';
import LoginController from '../controllers/login';

const LoginRouter = Router();

const controllers = new LoginController();

const validateLogin = [
  validateEmail,
  validatePassword,
];

LoginRouter.post('/', validateLogin, controllers.login);
LoginRouter.get('/validate', controllers.validateLogin);

export default LoginRouter;
