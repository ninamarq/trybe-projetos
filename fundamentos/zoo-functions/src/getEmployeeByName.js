const { employees } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  // acessar o employee object
  if (employeeName === undefined) {
    return {};
  }
  const findEmployee = employees.find((elemento) =>
    employeeName.includes(elemento.firstName) || employeeName.includes(elemento.lastName));
  return findEmployee;
}

module.exports = getEmployeeByName;
