import jwt from 'jsonwebtoken';
import { AuthToken } from '../interfaces/auth';

const jwtConfig = {
  // Quanto tempo ele irá expirar
  expiresIn: '10d',
};

// Pegando senha no dotenv
const SECRET = process.env.JWT_SECRET || 'Trybesmith';

const jwtToken = (data: AuthToken) => jwt.sign({ data }, SECRET, jwtConfig);

export default jwtToken;