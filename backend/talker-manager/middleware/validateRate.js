const checkingRate = (res, rate) => {
  const check = (rate < 1 || rate > 5 || rate === undefined);
  return check;
};

module.exports = (req, res, next) => {
  try {
    const { talk } = req.body;
    if (checkingRate(res, talk.rate)) {
      return res.status(400).json({
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      });
    }
    if (!Number.isInteger(talk.rate)) {
      return res.status(400).json({
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      });
    }
    return next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
