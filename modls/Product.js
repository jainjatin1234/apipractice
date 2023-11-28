const mongoose = require('mongoose')
const productschema = new mongoose.Schema({
    name:{
        type:String,
        require:true,

    },
    image:{
        public_id:{
            type:String,
        },
        url:{
            type:String,
        },
    },
})

const productModel =  mongoose.model('product',productschema)
module.exports = productModel;