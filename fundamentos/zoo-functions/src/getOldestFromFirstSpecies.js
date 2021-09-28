const { employees, species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getAnimal(id) {
  const employee = employees.find((elemento) => id.includes(elemento.id));
  const responsible = employee.responsibleFor;
  return responsible[0];
}

function getNameAnimal(identifier) {
  const idAnimal = getAnimal(identifier);
  const animalInfo = species.find(({ id }) => idAnimal.includes(id));
  return animalInfo.residents;
}

function getAges(id) {
  const animal = getNameAnimal(id);
  const sortAnimal = animal.sort((a, b) => b.age - a.age);
  return Object.values(sortAnimal[0]);
}

function getOldestFromFirstSpecies(id) {
  return getAges(id);
}

module.exports = getOldestFromFirstSpecies;

console.log(getAges('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));
