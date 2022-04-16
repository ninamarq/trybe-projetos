module.exports = (req, res, next) => {
  try {
    const { talk } = req.body;
    // https://regexr.com/
    const dateRegex = /^([012][1-9]|3[01])\/(0[1-9]|1[0-2])\/([0-2][0-9]{3})$/;
    if (!dateRegex.test(talk.watchedAt)) {
      return res.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      });
    }
    return next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
