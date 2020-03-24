'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review: DataTypes.STRING,
    BookId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.Book);
    Review.belongsTo(models.User)  };
  return Review;
};