const express = require('express')
const Usercontroller = require('../controller/Usercontroller')
const checkauth = require('../middleware/auth')
const router = express.Router()


router.get('/getuserdetails',checkauth,Usercontroller.getuserdetails)
router.get('/getuser',checkauth,Usercontroller.getuser)
router.post('/userinsert',Usercontroller.userinsert)
router.post('/verifylogin',Usercontroller.verifylogin)
router.get('/logout',Usercontroller.logout)

router.post('/updatepassword',checkauth,Usercontroller.updatepassword)

router.delete('/deleteuser'),checkauth,Usercontroller.DeleteUser
router.get('/getsingleuser/:id'),checkauth,Usercontroller.getsingleuser
module.exports = router