const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
       title:{
           type:String,
           required:true,
           unique:true,
       },
       dectn:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false,
    },
    name:{
        type:String,
        required:false
    },
    categories:{
        type:Array,
        required:false
    }
}, {timestamps:true})

module.exports = mongoose.model('Posts', PostSchema)