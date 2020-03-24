const router = require('express').Router();
const BookController = require('../controllers/BookController.js');
const {authentication, isAdmin} = require('../middleware/authentication')

router.get('/',BookController.getAll);
router.post('/', authentication, isAdmin, BookController.insert);
router.get('/:id',BookController.getOne);
router.get('/name/:name',BookController.getOneByName);
router.post('/many', authentication, isAdmin, BookController.insertMany);
router.delete('/:id', authentication, isAdmin, BookController.delete);

module.exports = router;