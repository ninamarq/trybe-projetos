const crypto = require('crypto');

module.exports = (req, res, next) => {
  try {
    const token = crypto.randomBytes(8).toString('hex');
      res.status(200).json({
        token,
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
