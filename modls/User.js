const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        
            name: {
                type: String,
                require: true,
            },
            email: {
                type: String,
                require: true,
            },
            image: {
                public_id: {
                    type: String,
                },
                url: {
                    type: String,
                },
            },
            password: {
                type: String,
                require: true,
            },
            role: {
                type: String,
                default: "User",
            },
        },
        { timestams: true }
    
)

const usermodel = mongoose.model('user',userSchema)
module.exports = usermodel