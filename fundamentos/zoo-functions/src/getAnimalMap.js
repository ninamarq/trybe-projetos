const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function residentsReduce(residents, options = { includeNames: false, sex: false, sorted: false }) {
  const res = residents.reduce((acc, elemento) => {
    if (options.sex && options.sex === elemento.sex) acc.push(elemento.name);
    if (!options.sex) acc.push(elemento.name);
    return acc;
  }, []);
  return res;
}

// fonte: https://github.com/tryber/sd-015-b-project-zoo-functions/blob/bruno-bartolomeu-zoo-functions-project/src/getAnimalMap.js
function getAnimalMap(options = { includeNames: false, sex: false, sorted: false }) {
  const obj = { NE: [], NW: [], SE: [], SW: [] };
  species.forEach(({ residents, name, location }) => {
    if (options.includeNames) {
      const residentsName = residentsReduce(residents, options);
      if (options.sorted) residentsName.sort();
      obj[location].push({ [name]: residentsName });
    } else {
      obj[location].push(name);
    }
  });
  return obj;
}

module.exports = getAnimalMap;
