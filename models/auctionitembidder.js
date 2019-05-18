'use strict';

import * as bch from 'bitcore-lib-cash';

module.exports = (sequelize, DataTypes) => {
  var AuctionItemBidder = sequelize.define('AuctionItemBidder', {
    participant_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    auction_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    private_key: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {

    tableName: 'auction_item_bidders',

    hooks: {

      beforeCreate: function(model, options) {

        let key = new bch.PrivateKey();

        model.private_key = key.toWIF();

        model.address = key.toAddress().toString();

      }

    },

    classMethods: {
      tableName: 'auction_item_bidders',
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return AuctionItemBidder;
};
