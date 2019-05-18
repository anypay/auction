'use strict';
module.exports = (sequelize, DataTypes) => {
  var Participant = sequelize.define('Participant', {
    email: DataTypes.STRING,
    auction_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    private_key: DataTypes.STRING
  }, {
    tableName: 'participants',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Participant;
};
