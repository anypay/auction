const Sequelize = require('sequelize');
const db = require('../db')


const Item = db.define('items', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  photos: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Item
