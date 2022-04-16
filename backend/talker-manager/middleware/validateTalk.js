const checkingTalk = (res, talk) => {
  const check = (!talk || talk.rate === undefined || !talk.watchedAt || talk === undefined);
  return check;
};

module.exports = (req, res, next) => {
  try {
    const { talk } = req.body;
    if (checkingTalk(res, talk)) {
      return res.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
    }
    return next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
