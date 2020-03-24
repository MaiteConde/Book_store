const { Review, Book, User } = require('../models/index.js')
const AuthorController = {
    getAll(req,res){
        Review.findAll({ include: [Book, User]})
        .then(reviews=>res.send(reviews))
    },

    insert(req,res){
        Review.create({...req.body})
        .then(review=>res.send(review))
    },

    async put(req, res) {
        try {
            await Review.update({...req.body},
                {
                    where: {
                        id: req.params.id
                    }
                })
                res.send('The review has been updated');

        } catch (error) {
            console.log(error)
        }
       
    },

    async delete(req, res) {
        try {
            await Review.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.send('The review has been deleted');
        }
         catch (error) {
            console.log(error)
        }
    }
}
module.exports = AuthorController;