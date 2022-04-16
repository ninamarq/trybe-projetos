// 1a coisa - Ler o Arquivo.
const { readFile, writeFile } = require('fs/promises');

module.exports = async (req, res, next) => {
  try {
    // Lendo o arquivo
    const talkers = await readFile('./talker.json', 'utf-8');
    // Convertendo a leitura para JSON
    const talkersParsed = JSON.parse(talkers);
    // Adicionando o body ao talkers
    const { name, age, talk } = req.body;
    const id = talkersParsed.length + 1;
    const newTalkers = { id, name, age, talk };
    await writeFile('./talker.json', JSON.stringify([...talkersParsed, newTalkers]));
    // Retornando a Array
    return res.status(201).json(newTalkers);
  } catch (error) {
    next(error);
  }
};
