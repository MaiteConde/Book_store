const {Book, Genre, Author, GenreBook, Review, Sequelize, sequelize} = require('../models/index');
const { Op} = Sequelize;
const BookController = {
    getAll(req,res){
        Book.findAll({
            include:[Author, Genre, Review]
        })
        .then(books=>res.send(books))
    },
    getOne(req, res) {
        Book.findByPk(req.params.id, {
                include: [Genre]
            })
            .then(book => res.send(book))
    },
    getOneByName(req, res) {
        Book.findOne({
                where: {
                    name: {
                        [Op.like]: `%${req.params.name}%`
                    }
                },
                include: [Genre]
            })
            .then(book => res.send(book))
    },
    insert(req,res){
        Book.create({...req.body})
        .then(book=>{
           book.addGenre(req.body.GenreId)
           res.send(book)
        })
        
    },
  async insertMany(req,res){
      try {
        const books =req.body;
        const booksResponse =[]
        books.forEach(async book=>{
          const bookCreated = await Book.create({...book}); 
          bookCreated.addGenre(book.GenreId);
          booksResponse.push(bookCreated)
        });
        res.send('updated books')
          
      } 
      catch (error) {
          console.log(error)
      }
  
        
           
},
async delete(req, res) {
    try {
        await Book.destroy({
            where: {
                id: req.params.id
            }
        })
        await GenreBook.destroy({
            where: {
                BookId: req.params.id
            }
        })
        res.send({
            message: 'The book has been removed'
        })
    }
     catch (error) {
        console.log(error)
    }
}
}
module.exports = BookController;

