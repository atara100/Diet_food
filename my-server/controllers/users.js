const {User}=require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');
const joi=require('joi');
const bcrypt = require('bcrypt');
const { Recipe } = require('../models/Recipe');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');



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
            console.log(user.password);
            console.log(value.password);
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
            email: joi.string().min(6).max(256).email().regex(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).required(),
            password: joi.string().min(8).max(1024).regex(/((?=.{8,})(?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}))/).required(),
        });

        const {error,value}=schema.validate(req.body);

        if(error){
            throw 'email or password error';
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
            res.status(401).json({ error: 'error in sign up new user'  });
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
        
    },

    forgotPassword: async function(req, res,next){
        try{

         const schema=joi.object({
                email:joi.string().required().min(6).max(256).email(),
            });
            
            const {error,value} =schema.validate(req.body);

            if(error){
                throw 'error email';
            }


          const oldUser=await User.findOne({email:value.email});

          if(!oldUser){
            return res.json({status:'user not exist'})
          } 
          const secret=config.jwt_token+oldUser.password;
          const token=jwt.sign({email:oldUser.email,id:oldUser._id},secret,{expiresIn:"10m",});
          const link=`http://localhost:3001/reset-password/${oldUser._id}/${token}`;
           var transporter = nodemailer.createTransport({
             service: 'gmail',
             auth: {
               user: 'al0583230109@gmail.com',
               pass: 'dvysucvwtifkqnfz'
             }
           });

           var mailOptions = {
             from: 'youremail@gmail.com',
             to: value.email,
             subject: 'Password reset',
             text: link
           };

           transporter.sendMail(mailOptions, function(error, info){
             if (error) {
               console.log(error.message);
             } else {
               console.log('Email sent: ' + info.response);
               res.status(200).json({ok:'mail sent'});
             }
           });

          }
        catch(error){}
    },

    resetPassword:async function(req, res, next){

        try{
          const schema=joi.object({
                _id:joi.string().required(),
                token:joi.string().required()
            });
            const {error,value}=schema.validate({_id:req.params._id,token:req.params.token});

            if(error){
                res.status(400).json({error:'invalid data'});
                return;
            }

            const oldUser=await User.findOne({_id:value._id});
            if(!oldUser){
                return res.json({status:"user not exist"});
            }
            const secret=config.jwt_token+oldUser.password;
            const verify=jwt.verify(value.token,secret);

            res.status(200).json({ok:verify.email});

        }catch(error){
            console.log(error);
            res.status(400).json({error:"not verified"})
        }
    },
 
    newPassword:async function(req, res,next){
        try{
          const schema=joi.object({
                _id:joi.string().required(),
                token:joi.string().required(),
                password: joi.string().min(8).max(1024).regex(/((?=.{8,})(?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}))/).required(),
            });
            const {error,value}=schema.validate({_id:req.params._id,token:req.params.token,password:req.body.password});

            if(error){
                console.log(error);
                res.status(400).json({error:error.message});
                return;
            }

            const oldUser=await User.findOne({_id:value._id});
            if(!oldUser){
                return res.json({status:"user not exist"});
            }
            const secret=config.jwt_token+oldUser.password;
            const verify=jwt.verify(value.token,secret);
            console.log(value.password);
            const encryptedPass=await bcrypt.hash(value.password,10);
            await User.updateOne({_id:value._id},{$set:{password:encryptedPass}});
            console.log('password updated');
            res.status(200).json({ok:'password updated'});

        }catch(error){
            console.log(error);
            res.status(400).json({error:"Something went wrong"})
        }
    },

    getAll: async function(req, res, next){
        try{
            const result=await User.find({});
            res.json(result);

        }catch(err){
            console.log(err);
            res.status(400).json({error:'error getting users'})
        }
    },

    delete: async function(req, res, next) {
        try{
            const schema = joi.object({
                _id:joi.string().required()
            });

            const {error,value}=schema.validate({_id:req.params.id});

            if(error){
                console.log(error);
                res.status(400).json({error:'Invalid data'});
                return;
            }

            const deleted=User.findOne({_id:value._id});

            await User.deleteOne(deleted).exec();
            res.status(200).json({ok:'deleted!'});

        }catch(err){
            console.log(err);
            res.status(400).json({error:'error delete user'});
        }
    },

    changeAdminStatus: async function(req, res, next){
        try{

            const schema=joi.object({
                userAdminData:joi.boolean().required(),
            });

            const {error,value}=schema.validate(req.body);

            if (error) {
                res.status(400).json({error:'Invalid data'});
                return;
            }

            const user= await User.findOneAndUpdate({_id:req.params.id},{admin:value.userAdminData});
            if(!user) return res.status(404).send('given id was not found');
            const updated=await User.findOne({_id:req.params.id});
            res.json(updated);
            updated.save();

        }catch(err){
            console.log(err);
            res.status(400).json({error:'error update user admin status'});
        }
    },

    getUserById: async function(req, res, next){
        try{
            const schema=joi.object({
                _id:joi.string().required()
            });

            const {error,value}=schema.validate({_id:req.params.id});

            if(error){
                res.status(400).json({error:'invalid data'});
                return;
            }

            const result=await User.findOne({_id:value._id});
            res.json(result);

        }catch(err){
            console.log(err);
            res.status(400).json({error:'error getting user'})
        }
    }


    

}