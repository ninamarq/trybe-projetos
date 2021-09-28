const { prices } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function filtering(entrants) {
  const findingAges = entrants.map((elemento) => elemento.age);
  const obj = { child: 0,
    adult: 0,
    senior: 0 };
  const filterAge = findingAges.map((age) => {
    if (age < 18) {
      obj.child += 1;
    } else if (age >= 18 && age < 50) {
      obj.adult += 1;
    } else {
      obj.senior += 1;
    }
    return obj;
  });
  return filterAge[0]; // estava retornando todos
}
function countEntrants(entrants) {
  if (Object.keys(entrants).length === 0) {
    return 0;
  }
  return filtering(entrants);
}

function calculateEntry(entrants) {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  // recolhendo o obj de countEntrants
  const howMany = countEntrants(entrants);
  if (howMany === 0) {
    return 0;
  }
  // coletando preços
  const numbersPeople = Object.values(howMany);
  const childPrice = numbersPeople[0] * prices.child;
  const adultPrice = numbersPeople[1] * prices.adult;
  const seniorPrice = numbersPeople[2] * prices.senior;
  return childPrice + adultPrice + seniorPrice;
}

module.exports = { calculateEntry, countEntrants };
