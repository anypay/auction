const User = require('./user')
const Auction = require('./auction')
const Bid = require('./bid')
const Item = require('./item')

//Associations here
User.hasMany(Bid)

Bid.hasOne(User)
Bid.hasOne(Item)

Auction.hasMany(Bid)

Item.belongsTo(Auction)
Item.hasMany(Bid)

module.exports = {
  User,
  Auction,
  Bid,
  Item
}
