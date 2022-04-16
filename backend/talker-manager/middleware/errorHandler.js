// middleware genérico de erro
module.exports = (error, req, res) => {
  console.log(error);
  return res.status(404).json({ message: 'Algo deu errado!' });
};
