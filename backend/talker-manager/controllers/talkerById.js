// 1a coisa - Ler o Arquivo.
const { readFile } = require('fs/promises');

module.exports = async (req, res, next) => {
  try {
    // Lendo o id
    const { id } = req.params;
    // Ler arquivo
    const talkers = await readFile('./talker.json', 'utf-8');
    const talkersParsed = JSON.parse(talkers);
    // Encontrando talker pelo id
    const talkerById = talkersParsed.find((talker) => talker.id === Number(id));
    if (talkerById) {
        (res.status(200).json(talkerById));
    } else {
        (res.status(404).json({ message: 'Pessoa palestrante não encontrada' }));
    }
  } catch (error) {
      console.log(error);
      return next(error);
  }
};
