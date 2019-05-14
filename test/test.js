const Sequelize = require('sequelize')
const assert = require('assert')
const addUser = require('../lib/user.ts')
const { createAuction, beginAuction, endAuction } = require('../lib/auction.ts')
const db = require('../db')
const {User, Auction} = require('../db/models')

beforeEach(function() {
  db.sync()
})

//User Tests
describe('Add a user', function() {
  it('should add a user to the database', async function() {
    addUser('DJ', 'DJ@email.com')
    try {
      const user = await User.findOne({
        where: {name: 'DJ'}
      })
      if (user !== undefined) {
        console.log('USERNAME::: ', user.name)
      }
    } catch (err) {
      console.error(err)
    }
  })
})

//Auction Tests
describe('Auctions', function () {
  describe('Creating a new auction', function () {
    it('should create a new auction instance', async function () {
      createAuction(14.99)
      try {
        const auction = await Auction.findOne({
          where: {currentPrice: 14.99}
        })
        if (auction !== undefined) {
          console.log('Auction created.')
        }
      } catch (err) {
        console.error(err)
      }
    })
  });
  describe('Beginning an auction', function () {
    it('should update the "closed" property to "false"', async function () {
      beginAuction(1)
      let auction;
      try {
        auction = await Auction.findOne({
          where: {
            id: 1
          }
        })
      } catch (err) {
        console.error(err)
      }
      assert.equal(auction.closed, false)
      console.log('Auction has begun.')
    })
  });
  describe('Ending an auction', function () {
    it('should update the "closed" property to "true"', async function () {
      endAuction(1)
      let auction;
      try {
        auction = await Auction.findOne({
          where: {
            id: 1
          }
        })
      } catch (err) {
        console.error(err)
      }
      assert.equal(auction.closed, true)
      console.log('Auction has ended.')
    })
  })
})
