const { Book, Order, User, OrderBook} = require('../models/index.js')
const OrderController = {
    getAll(req,res){
        Order.findAll({
          include:[{ model: Book, attributes: { exclude: ["stock"] }}, User]
        })
        .then(orders=>res.send(orders))
    },
    insert(req,res){
        Order.create({
            status:"pending",
            deliveryDate:req.body.deliveryDate,
            UserId:req.body.UserId
        })
        .then(order => {
            req.body.books.forEach(book=>{
                order.addBook(
                    book[0], {
                    through: {
                    units: book[1]
                    }
            })
            });
            res.send(order);
        });
    },
   
    async delete(req, res) {
        await Order.destroy({
            where: {
                id: req.params.id
            }
        })
        await OrderBook.destroy({
            where: {
                OrderId: req.params.id
            }
        })
        res.send(
            'The book has been deleted'
        )
    },

    async put(req, res) {
        await Order.update({...req.body},
        {
            where: {
                id: req.params.id
            }
        })
        await OrderBook.destroy({
            where: {
                OrderId: req.params.id
            }
        
        })
        await req.body.books.forEach(book =>{
            OrderBook.create({
                OrderId: req.params.id,
                BookId: book[0],
                units: book[1]}
            )
       })
        
            res.send('The order has been updated');
       }
}
        
module.exports = OrderController;