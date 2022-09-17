import jwt from '../helpers/jwt';
import { Users } from '../database/models';

const bcrypt = require('bcryptjs');

export interface ILogin {
  email: string;
  password: string;
}

class Login {
  public static async login(email: string, password: string) {
    try {
      const loginUser = await Users.findOne({ where: { email } });
      const checkPassword = await bcrypt.compare(password, loginUser?.password);
      if (!checkPassword) { return false; }
      const user = {
        id: loginUser?.id,
        username: loginUser?.username,
        role: loginUser?.role,
        email: loginUser?.email,
      };
      const token = await jwt.generateToken(user);
      const returnObj = { user, token };
      return returnObj;
    } catch (error) {
      console.log(error);
    }
  }
}

export default Login;
