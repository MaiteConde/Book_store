const router = require('express').Router();
const AuthorController = require('../controllers/AuthorController.js');

router.get('/',AuthorController.getAll);
router.post('/',AuthorController.insert);
router.post('/many',AuthorController.insertMany);

module.exports = router;