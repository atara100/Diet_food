const mongoose = require('mongoose');

const recipeSchema=new mongoose.Schema({
    image:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    ingredients:{
        type:String,
        require:true
    },
    method:{
        type:String,
        require:true
    },
    calories:{
        type:Number,
        require:true
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

exports.Recipe = Recipe;