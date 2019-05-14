const { Auction } = require('../db/models')

async function createAuction (currentPrice) {
  try {
    await Auction.create({
      currentPrice
    })
  } catch (err) {
    console.error(err)
  }
}

async function beginAuction (auctionID) {
  try {
    await Auction.update({
      closed: false
    }, {
      where: {id: auctionID}
    })
  } catch (err) {
    console.error(err)
  }
}

async function endAuction (auctionID) {
  try {
    await Auction.update({
      closed: true
    }, {
      where: {id: auctionID}
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = { 
  createAuction,
  beginAuction,
  endAuction
}
