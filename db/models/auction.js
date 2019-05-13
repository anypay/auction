const Sequelize = require('sequelize')
const db = require('../db')

const Auction = db.define('auctions', {
  currentPrice: {
    type: Sequelize.DECIMAL
  },
  closed: {
    type: Sequelize.BOOLEAN
  }
})


module.exports = Auction
