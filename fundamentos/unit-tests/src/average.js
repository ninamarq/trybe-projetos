// alteração para commit
const average = (array) => {
  if (array.length === 0) {
    return undefined;
  }
  let sum = 0;
  for (let i = 0; i < array.length; i += 1) {
    if (typeof array[i] === 'number') {
      sum += array[i];
    } else {
      return undefined;
    }
  }
  return Math.round(sum / array.length);
};

module.exports = average;
