const validateDisplayName = async (req, res, next) => {
  try {
    const { displayName } = req.body;
    if (typeof displayName !== 'string' || displayName.length < 8) {
      return res.status(400).json({
        message: '"displayName" length must be at least 8 characters long',
      });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const validateEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    // Regex retirado do StackOverFlow
    const regexEmail = /\S+@\S+\.\S+/;
    const checkedEmail = regexEmail.test(email);
    if (!email) {
      return res.status(400).json({
        message: '"email" is required',
      });
    }
    if (!checkedEmail) {
      return res.status(400).json({
        message: '"email" must be a valid email' });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const validatePassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({
        message: '"password" is required',
      });
    }
    if (password.length !== 6) {
      return res.status(400).json({
        message: '"password" length must be 6 characters long',
      });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const validateToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        message: 'Token not found',
      });
    }
    const splittedToken = authorization.split('.');
    if (splittedToken.length !== 3) {
      return res.status(401).json({
        message: 'Expired or invalid token',
      });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
  validateToken,
};
