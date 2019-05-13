const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/auction')

module.exports = db;
