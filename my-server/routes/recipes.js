var express = require('express');
var router = express.Router();
const recipes = require('../controllers/recipes');

router.get('/',recipes.getAll);
router.get('/:id',recipes.getRecipeById);
router.post('/',recipes.add);
router.patch('/:id',recipes.update);
router.delete('/:id',recipes.delete);

module.exports = router;