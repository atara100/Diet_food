const {User}=require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');
const joi=require('joi');
const bcrypt = require('bcrypt');
const { Recipe } = require('../models/Recipe');
var mongoose = require('mongoose');


module.exports ={
    login: async function(req, res, next){
        try{
            const schema=joi.object({
                email:joi.string().required().min(6).max(256).email(),
                password:joi.string().required().min(6).max(1024)
            });
            
            const {error,value} =schema.validate(req.body);

            if(error){
                throw 'unauthorized';
            }

            const user=await User.findOne({email:value.email});
            if(!user) {
                res.status(401).json({ error: 'Invalid email' });
                return;
            }
            const validPassword=await bcrypt.compare(value.password,user.password);
            if(!validPassword){
                res.status(401).json({ error: 'Invalid password' });
                return
            } 

            const param={email:value.email};
            const token=jwt.sign(param,config.jwt_token,{ expiresIn: '72800s'});

            res.json({
                token:token,
                id:user._id,
                name:user.name,
                email:user.email,
                image:user.image,
                favourites:user.favourites,
                admin:user.admin,
                weight:user.weight
            })

        }catch(err){
            res.status(401).json({ error: `${err}` });
            return;
        }
    },

    signup:async function(req,res,next){
       try{
        const schema=joi.object({
            name: joi.string().required().min(2).max(256),
            email: joi.string().min(6).max(256).required().email(),
            password: joi.string().min(6).max(1024).required(),
        });

        const {error,value}=schema.validate(req.body);

        if(error){
            throw 'error sign up new user';
        }

        const user=await User.findOne({email:value.email})
        if(user){
            return res.status(400).json({error:"User already registered"})
        }

        const hash=await bcrypt.hash(value.password,10);
        const newUser=new User({
            name:value.name,
            email:value.email,
            password:hash
        });
        await newUser.save();

        res.json({
            id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            admin:newUser.admin,
            image:newUser.image,
            weight:newUser.weight
        })
       }catch(err){
            res.status(401).json({ error: 'error sign up new user'  });
       }
    },

    favourites:async function(req, res, next){
        try{

            const value=req.body._id;

            const user= await User.findOne({_id:req.params.userId});
            if(!user) return res.status(404).send('given id was not found');

            if(!(user.favourites.includes(value))){
               user.favourites.push(value);
               await user.save();
               res.status(200).json(user);
            }
            else{
                const index=user.favourites.indexOf(value);
                user.favourites.splice(index, 1);
                await user.save();
                res.status(200).json(user);
            }

        }catch(err){
            console.log(err);
            res.status(400).json({error:'error change status of favourite'});
        }
    },

    userFavourites: async function(req, res,next){
        try{
            const schema=joi.object({
                _id:joi.string().required()
            });
            const {error,value}=schema.validate({_id:req.params.userId});
            if(error){
                res.status(400).json({error:'invalid data'});
                return;
            }

            const user=await User.findOne({_id:value._id});
            const favouritesArr=user.favourites;
            
            let recipes=[];
            if(favouritesArr.length>0){
            favouritesArr.forEach (async favId=>{ 
              var id= mongoose.Types.ObjectId(favId);             
              recipes.push(await Recipe.findOne({_id:id}));
              this.recipes=recipes;
           })
             res.json(this.recipes);
           }else{
            res.json([]);
           }

        }
        catch(err){
         console.log(err);
         res.status(400).json({error:'error getting favourites'});
        }
        
    }

}