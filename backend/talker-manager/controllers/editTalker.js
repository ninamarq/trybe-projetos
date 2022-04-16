const { readFile, writeFile } = require('fs/promises');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = await readFile('./talker.json', 'utf-8');
    const talkersParsed = JSON.parse(talkers);
    // Pegando index e trabalhando este no array
    const index = talkersParsed.findIndex((talker) => talker.id === Number(id));
    talkersParsed[index].name = name;
    talkersParsed[index].age = age;
    talkersParsed[index].talk = talk;
    await writeFile('./talker.json', JSON.stringify(talkersParsed));
    return res.status(200).json(talkersParsed[index]);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
