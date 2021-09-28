const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function countAnimals(animal) {
  if (animal === undefined) {
    const findingAnimals = species.map((elemento) => elemento.name);
    const findingResidents = species.map((elemento) => elemento.residents.length);
    const obj = {};
    for (let i = 0; i < findingAnimals.length; i += 1) {
      obj[findingAnimals[i]] = findingResidents[i];
    }
    return obj;
  } if (animal.sex === undefined) {
    const findingAnimal = species.find((elemento) => animal.specie.includes(elemento.name));
    return findingAnimal.residents.length;
  }
  const findingAnimal = species.find((elemento) => animal.specie.includes(elemento.name));
  const animales = findingAnimal.residents;
  const filteringGender = animales.filter((elemento) => elemento.sex === animal.sex);
  return filteringGender.length;
}

module.exports = countAnimals;

console.log(countAnimals());
