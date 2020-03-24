'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    stock: DataTypes.INTEGER,
    AuthorId: DataTypes.INTEGER,
    resume: DataTypes.STRING,
    image_path: DataTypes.STRING
  }, {});
  Book.associate = function(models) {
    Book.belongsTo(models.Author);
    Book.hasMany(models.Review);
    Book.belongsToMany(models.Order,{
      through:models.OrderBook
    }, { onDelete: 'cascade' });
    Book.belongsToMany(models.Genre,{
      through:models.GenreBook
    }, { onDelete: 'cascade' });
  };
  return Book;
};