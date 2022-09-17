import { sign, verify } from 'jsonwebtoken';
import { readFileSync } from 'fs';

interface IUserData {
  id?: number;
  username?: string;
  role?: string;
  email?: string;
}

class Jwt {
  private secret: string;

  constructor() {
    this.secret = readFileSync('jwt.evaluation.key', 'utf-8').trim();
  }

  async generateToken(data: IUserData): Promise<string> {
    return sign({ ...data }, this.secret);
  }

  async decryptToken(token: string): Promise<IUserData> {
    return verify(token, this.secret) as IUserData;
  }
}

export default new Jwt();
