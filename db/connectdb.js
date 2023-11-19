const mongoose = require('mongoose')

const dbconnect = ()=>{
    return mongoose.connect(process.env.LOCAL_URL)
    .then(()=>{
        console.log("data base connected")
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports = dbconnect






