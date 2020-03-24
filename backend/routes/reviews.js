const router = require('express').Router();
const ReviewController = require('../controllers/ReviewController.js');


router.get('/',ReviewController.getAll);
router.post('/', ReviewController.insert);
router.delete('/:id', ReviewController.delete);
router.put('/:id',ReviewController.put);

module.exports = router;