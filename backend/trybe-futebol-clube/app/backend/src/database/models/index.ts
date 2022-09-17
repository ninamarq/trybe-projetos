import { Sequelize } from 'sequelize';

const dbConfig = require('../config/database');

export default new Sequelize(dbConfig);

export { default as Teams } from './Teams';
export { default as Matches } from './Matches';
export { default as Users } from './Users';