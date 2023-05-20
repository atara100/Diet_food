var express = require('express');
var router = express.Router();
// const auth = require('../middleware/auth');
const users = require('../controllers/users');

// router.get('/:id', auth, users.details);

/* authentication */
router.post('/login', users.login);
router.post('/signup', users.signup);
router.post('/forgot-password',users.forgotPassword);
router.get('/reset-password/:_id/:token',users.resetPassword);
router.post('/reset-password/:_id/:token',users.newPassword);
router.patch('/:userId',users.favourites);
router.get('/:userId',users.userFavourites);


module.exports = router;
