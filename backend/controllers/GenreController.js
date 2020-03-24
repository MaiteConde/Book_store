const { Genre, Book } = require('../models/index.js')
const GenreController = {
    getAll(req,res){
        Genre.findAll({
            include:[Book]
        })
        .then(genres=>res.send(genres))
    },
    insert(req,res){
        Genre.create({name:req.body.name})
        .then(genre=>res.send(genre))
    },
    insertMany(req,res){
        Genre.bulkCreate([...req.body])
        .then(genres=>{
            res.status(201).send(genres)
        })
    },
    async delete(req, res) {
        try {
            await Genre.destroy({
                where: {
                    id: req.params.id
                }
            })
            await GenreBook.destroy({
                where: {
                    GenreId: req.params.id
                }
            })
            res.send({
                message: 'The book has been removed'
            })
        } catch (error) {
            console.log(error)
        }
        

}
}

module.exports = GenreController;