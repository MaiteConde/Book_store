const router = require('express').Router();
const GenreController = require('../controllers/GenreController.js');

router.get('/',GenreController.getAll);
router.post('/',GenreController.insert);
router.post('/many',GenreController.insertMany);
module.exports = router;