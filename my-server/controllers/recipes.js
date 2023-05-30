const {Recipe}=require('../models/Recipe');
const joi=require('joi');


module.exports={
    getAll: async function(req, res,next){
        try{
            const result=await Recipe.find({});
            res.json(result);

        }catch(err){
            console.log(err);
            res.status(400).json({error:'error getting recipes'})
        }
    },

    getRecipeById: async function(req, res, next){
        try{
            const schema=joi.object({
                _id:joi.string().required()
            });

            const {error,value}=schema.validate({_id:req.params.id});

            if(error){
                res.status(400).json({error:'invalid data'});
                return;
            }

            const result=await Recipe.findOne({_id:value._id});
            res.json(result);

        }catch(err){
            console.log(err);
            res.status(400).json({error:'error getting recipe'})
        }
    },

    add: async function(req, res, next){
        try{
            const schema=joi.object({
                image:joi.string().required(),
                title:joi.string().required(),
                description:joi.string().required(),
                ingredients:joi.string().required(),
                method:joi.string().required(),
                calories:joi.number().required()
            });

            const {error,value}=schema.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({error:'invalid data'});
                return;
            }

            const newRecipe=new Recipe(value);
            const result=await newRecipe.save();

            res.json({
                ...value,
                _id:result._id
            });

        }catch(err){
            res.status(400).json({error:'error add recipe'})
        }
    },

    update:async function(req, res, next){
        try{

            const schema=joi.object({
                image:joi.string().required(),
                title:joi.string().required(),
                description:joi.string().required(),
                ingredients:joi.string().required(),
                method:joi.string().required(),
                calories:joi.number().required()
            });

            const {error,value}=schema.validate(req.body);

            if (error) {
                res.status(400).json({error:'Invalid data'});
                return;
            }

            const recipe= await Recipe.findOneAndUpdate({_id:req.params.id},value);
            if(!recipe) return res.status(404).send('given id was not found');

            const updated=await Recipe.findOne({_id:req.params.id});
            res.json(updated);

        }catch(err){
            console.log(err);
            res.status(400).json({error:'error update recipe'});
        }
    },

    delete: async function(req, res, next) {
        try{
            const schema = joi.object({
                _id:joi.string().required()
            });

            const {error,value}=schema.validate({_id:req.params.id});

            if(error){
                res.status(400).json({error:'Invalid data'});
                return;
            }

            const deleted=Recipe.findOne({_id:value._id});

            await Recipe.deleteOne(value).exec();
            res.status(200).json({ok:'ok'});

        }catch(err){
            console.log(err);
            res.status(400).json({error:'error delete recipe'});
        }
    }

}