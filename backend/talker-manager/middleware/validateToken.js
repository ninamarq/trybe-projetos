module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({
        message: 'Token não encontrado',
      });
    } else if (authorization.length !== 16) {
      res.status(401).json({
        message: 'Token inválido',
      });
    }
    return next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
