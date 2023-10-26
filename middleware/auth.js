const jwt = require('jsonwebtoken')
const UserModel  = require('../modls/User')

const checkAdminAuth = async(req,res,next)=>{

    // console.log('hello')
    const {token} = req.cookies
    // console.log(token)
    if(!token){
        res
        .status(401)
        .json({ status: "failed", message: "unauthorized user " });   
    }else{
        const verify_token = jwt.verify(token,'jatin12345')
        // console.log(data)

        const admin  = await UserModel.findOne({_id: verify_token.ID})
        // console.log(admin)
        req.admin = admin
        next()

    }
}

module.exports = checkAdminAuth