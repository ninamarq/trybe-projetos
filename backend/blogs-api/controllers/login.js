const jwtToken = require('../helpers/jwtToken');
const { User } = require('../models');

const signIn = async (req, res, next) => {
  try {
    const { email } = req.body;
    const users = await User.findAll();
    const checkEmails = users.some((user) => user.email === email);
    if (!checkEmails) {
      return res.status(400).json({
        message: 'Invalid fields',
      });
    }
    // Referência Trybe Course e Monitoria Gaspar
    const userByEmail = await User.findOne({ where: { email } });
    const token = jwtToken({ id: userByEmail.id, email });
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  signIn,
};
