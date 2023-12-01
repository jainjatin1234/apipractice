const mongoose = require('mongoose')
const productschema = new  mongoose.Schema(
    {
        
        name: {
            type: String,
            require: true,
        },
        image:{
            public_id:{
                type:String,
            },
            url:{
                type:String,
            },
        },
        price:{
            type:Number,
            require:true,
        },

        stock:{
            type:Number,
            require:true,
            default:1,
        }

    },
    { timestams: true }

)

const productmodel = mongoose.model('product',productschema)
module.exports = productmodel;