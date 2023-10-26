const express = require('express')
const app = express()
const web = require('./routes/web')
const fileupload = require('express-fileupload')
const cookie = require('cookie-parser')
const connnectdb = require('./db/connectdb')
const dotenv = require('dotenv')
dotenv.config(
    {
        path:'.env'
    }
)

const cors = require('cors')
app.use(cors())


//get token in auth
app.use(cookie())

//temp file uploader
app.use(fileupload({useTempFiles:true}))


//for data get from api
app.use(express.json())
connnectdb()

//load route
app.use('/api',web)


app.listen(process.env.PORT,()=>{
    console.log("server started")
})