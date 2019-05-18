'use strict';
module.exports = (sequelize, DataTypes) => {
  var Auction = sequelize.define('Auction', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_date: {
      type:DataTypes.DATE,
      allowNull: true
    },
    top_bid_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {

    tableName: 'auctions',

    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Auction;
};
