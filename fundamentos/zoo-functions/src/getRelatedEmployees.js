const { employees } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function isManager(id) {
  // checar se esse id aparece em algum managers
  const checkManager = employees.some((elemento) => {
    const manag = elemento.managers;
    if (manag.includes(id)) {
      return true;
    }
    return false;
  });
  return checkManager;
}

function getRelatedEmployees(managerId) {
  // recolhe os gerentes
  if (isManager(managerId) === true) {
    const empFilt = employees.filter((elemento) => (elemento.managers.includes(managerId)));
    const mapingEmp = empFilt.map((employee) => `${employee.firstName} ${employee.lastName}`);
    return mapingEmp;
  }
  // recolhido do exemplo no README.md
  throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
}

module.exports = { isManager, getRelatedEmployees };
