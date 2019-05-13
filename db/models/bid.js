const Sequelize = require('sequelize')
const db = require('../db')

const Bid = db.define('bids', {
  price: {
    type: Sequelize.DECIMAL
  }
})

module.exports = Bid
