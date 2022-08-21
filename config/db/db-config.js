//import { Sequelize } from 'sequelize';
const { Sequelize } = require('sequelize');

const sqlize = new Sequelize(
  'estudos_node',
  'root',
  undefined,
  {
    host: 'localhost',
    dialect: 'mysql'
  });

module.exports = sqlize;