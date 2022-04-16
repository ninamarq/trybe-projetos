// 1a coisa - Ler o Arquivo.
const { readFile } = require('fs/promises');

module.exports = async (req, res, next) => {
  try {
    // Lendo o arquivo
    const talkers = await readFile('./talker.json', 'utf-8');
    // Convertendo a leitura para JSON
    const talkersParsed = JSON.parse(talkers);
    // Retornando a Array
    return res.status(200).json(talkersParsed);
  } catch (error) {
    next(error);
  }
};
