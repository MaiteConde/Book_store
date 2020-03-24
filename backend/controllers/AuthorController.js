const { Author, Book } = require('../models/index.js')
const AuthorController = {
    getAll(req,res){
        Author.findAll({ include: [Book]})
        .then(authors=>res.send(authors))
    },
    insert(req,res){
        Author.create({name:req.body.name})
        .then(author=>res.send(author))
    },
    insertMany(req,res){
        Author.bulkCreate([...req.body])
        .then(authors=>{
            res.status(201).send(authors)
        })
    }
}
module.exports = AuthorController;

