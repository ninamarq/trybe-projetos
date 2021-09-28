const { hours, species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function day(obj, elemento) {
  if (elemento === 'Monday') {
    return 'CLOSED';
  }
  return `Open from ${hours[elemento].open}am until ${hours[elemento].close}pm`;
}

function exhibAnimal(elemento) {
  if (elemento === 'Monday') {
    return 'The zoo will be closed!';
  }
  const animalAv = species.filter((specie) => (specie.availability.includes(elemento)));
  const getName = animalAv.map((name) => name.name);
  return getName;
}

function allSche() {
  const hoursKeys = Object.keys(hours);
  const obj = {};
  hoursKeys.map((elemento) => {
    obj[elemento] = {
      officeHour: day(obj, elemento),
      exhibition: exhibAnimal(elemento) };
    return obj;
  });
  return obj;
}

function getDayInfo(hour) {
  const week = allSche();
  const keys = Object.keys(week);
  if (keys.includes(hour)) {
    return { [hour]: week[hour] };
  }
}

function getAnimalInfo(animal) {
  const animals = species.map((elemento) => elemento.name);
  const animalsExib = species.find((elemento) => elemento.name === animal);
  if (animals.includes(animal)) {
    return animalsExib.availability;
  }
}

function getSchedule(scheduleTarget) {
  const animalName = species.map((elemento) => elemento.name);
  const dayName = Object.keys(hours);
  if (!scheduleTarget) {
    return allSche();
  } if (dayName.includes(scheduleTarget)) {
    return getDayInfo(scheduleTarget);
  } if (animalName.includes(scheduleTarget)) {
    return getAnimalInfo(scheduleTarget);
  }
  return allSche();
}

module.exports = getSchedule;

console.log(getSchedule('lions'));
