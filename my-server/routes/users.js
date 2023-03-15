var express = require('express');
var router = express.Router();
// const auth = require('../middleware/auth');
const users = require('../controllers/users');

// router.get('/:id', auth, users.details);

/* authentication */
router.post('/login', users.login);
router.post('/signup', users.signup);
router.patch('/:userId',users.favourites);
router.get('/:userId',users.userFavourites);

module.exports = router;
