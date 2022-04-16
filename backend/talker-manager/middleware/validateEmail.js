module.exports = (req, res, next) => {
  try {
    const { email } = req.body;
    const regexEmail = /\S+@\S+\.\S+/;
    const checkedEmail = regexEmail.test(email);
    if (!email) {
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!checkedEmail) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    return next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
