const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  // coletar o animal pelo name
  const findAnimal = species.find((elemento) => animal.includes(elemento.name));
  // comparar idade do animal encontrado
  const animalsInfo = findAnimal.residents;
  const animalsAge = animalsInfo.every((elemento) => {
    const ageAn = elemento.age;
    if (ageAn <= age) {
      return false;
    }
    return true;
  });
  return animalsAge;
}

module.exports = getAnimalsOlderThan;
