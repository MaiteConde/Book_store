'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderBook = sequelize.define('OrderBook', {
    OrderId: DataTypes.INTEGER,
    BookId: DataTypes.INTEGER,
    units: DataTypes.INTEGER
  }, {});
  OrderBook.associate = function(models) {
    // associations can be defined here
  };
  return OrderBook;
};