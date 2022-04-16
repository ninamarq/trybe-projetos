const jwt = require('jsonwebtoken');

const jwtConfig = {
  // Quanto tempo ele irá expirar
  expiresIn: '10d',
};

// Pegando senha no dotenv
const SECRET = process.env.JWT_SECRET;

module.exports = (data = {}) => jwt.sign({ data }, SECRET, jwtConfig);