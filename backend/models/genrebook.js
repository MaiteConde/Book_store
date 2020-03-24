'use strict';
module.exports = (sequelize, DataTypes) => {
  const GenreBook = sequelize.define('GenreBook', {
    GenreId: DataTypes.INTEGER,
    BookId: DataTypes.INTEGER
  }, {});
  GenreBook.associate = function(models) {
    // associations can be defined here
  };
  return GenreBook;
};