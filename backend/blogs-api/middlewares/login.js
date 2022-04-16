const validateEmail = async (req, res, next) => {
  try {
    const body = Object.keys(req.body);
    const emailExist = body.some((key) => key === 'email');
    if (emailExist && req.body.email.length === 0) {
      return res.status(400).json({
        message: '"email" is not allowed to be empty' });
    }
    if (!emailExist) {
      return res.status(400).json({
        message: '"email" is required',
      });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const validatePassword = async (req, res, next) => {
  try {
    const body = Object.keys(req.body);
    const passwordExist = body.some((key) => key === 'password');
    if (passwordExist && req.body.password.length === 0) {
      return res.status(400).json({
        message: '"password" is not allowed to be empty',
      });
    }
    if (!passwordExist) {
      return res.status(400).json({
        message: '"password" is required',
      });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  validateEmail,
  validatePassword,
};
