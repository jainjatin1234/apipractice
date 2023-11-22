const express = require('express')
const CategoryController = require('../controller/CategoryController')
const Usercontroller = require('../controller/Usercontroller')
// const checkauth = require('../middleware/auth')
const router = express.Router()


router.get('/getuserdetails',Usercontroller.getuserdetails)
router.get('/getuser',Usercontroller.getuser)
router.post('/userinsert',Usercontroller.userinsert)
router.post('/verifylogin',Usercontroller.verifylogin)
router.get('/logout',Usercontroller.logout)

router.post('/updatepassword',Usercontroller.updatepassword)

router.delete('/deleteuser'),Usercontroller.DeleteUser
router.get('/getsingleuser/:id'),Usercontroller.getsingleuser


router.get('/getcategory', CategoryController.getcategory)
router.post('/insertcategory', CategoryController.insertcategory)
module.exports = router