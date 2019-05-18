'use strict';
module.exports = (sequelize, DataTypes) => {
  var AuctionItem = sequelize.define('AuctionItem', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    auction_id: DataTypes.INTEGER
  }, {
    tableName: 'auction_items',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return AuctionItem;
};
