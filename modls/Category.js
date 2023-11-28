const mongoose = require('mongoose')
const categoryschema = new  mongoose.Schema(
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
        products:{
            type:String,
            require:true,
        }

    },
    { timestams: true }

)

const categorymodel = mongoose.model('category',categoryschema)
module.exports = categorymodel;