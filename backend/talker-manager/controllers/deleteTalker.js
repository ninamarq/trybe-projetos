const { readFile, writeFile } = require('fs/promises');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const talkers = await readFile('./talker.json', 'utf-8');
    const talkersParsed = JSON.parse(talkers);
    // Retirando pessoa
    const newTalkers = talkersParsed.filter((talker) => talker.id !== Number(id));
    await writeFile('./talker.json', JSON.stringify(newTalkers));
    return res.status(204).json(newTalkers);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
