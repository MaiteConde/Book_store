const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


const booksRouter = require('./routes/books.js');
const authorsRouter = require('./routes/authors.js');
const genresRouter = require('./routes/genres.js');
const ordersRouter = require('./routes/orders.js');
const usersRouter = require('./routes/users.js');
const reviewsRouter = require('./routes/reviews.js');

app.use(morgan('dev'));
app.use(express.json());

app.use('/books',booksRouter)
app.use('/authors',authorsRouter);
app.use('/genres',genresRouter);
app.use('/orders',ordersRouter);
app.use('/users',usersRouter);
app.use('/reviews',reviewsRouter)

app.listen(PORT,()=>console.log('server running on '+PORT));