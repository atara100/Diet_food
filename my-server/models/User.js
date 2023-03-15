const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        minlength: 2,
        maxlength: 256,
    },
    email:{
        type:String,
        require:true,
        minlength: 6,
        maxlength: 256,
        unique: true,
    },
    password:{
        type:String,
        require:true,
        minlength: 6,
        maxlength: 1024,
    },
    image:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    },
    favourites:{
        type:Array,
        default:[]
    },
    admin:{
        type:Boolean,
        default:false,
        require:true
    },
    weight:{
        type:Number,
        default:0
    }
});

const User=mongoose.model('User',userSchema);
exports.User=User;