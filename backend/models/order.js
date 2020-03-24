'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    status: DataTypes.STRING,
    deliveryDate: DataTypes.DATE,
  }, {});
  Order.associate = function(models) {
    Order.belongsToMany(models.Book,{
      through:models.OrderBook,
      onDelete: 'cascade' 
    });
  };
  return Order;
};