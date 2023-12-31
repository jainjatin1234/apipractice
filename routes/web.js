const express = require('express')
const CategoryController = require('../controller/CategoryController')
const ProductControllerr = require('../controller/ProductControllerr')
const Usercontroller = require('../controller/Usercontroller')
const checkauth = require('../middleware/auth')
const router = express.Router()


router.get('/me',checkauth,Usercontroller.getuserdetails)
router.get('/getuser',Usercontroller.getuser)
router.post('/userinsert',Usercontroller.userinsert)
router.post('/verifylogin',Usercontroller.verifylogin)
router.get('/logout',Usercontroller.logout)

router.post('/updatepassword',Usercontroller.updatepassword)

router.delete('/deleteuser'),Usercontroller.DeleteUser
router.get('/getsingleuser/:id'),Usercontroller.getsingleuser


router.get('/getcategory', CategoryController.getcategory)
router.post('/insertcategory', CategoryController.insertcategory)
router.delete('/deletecategory/:id',CategoryController.deletecategory)


router.get('/getproduct', ProductControllerr.getproduct)
router.post('/insertproduct', ProductControllerr.insertproduct)
router.delete('/deleteproduct/:id',ProductControllerr.deleteproduct)
router.get('/getproductdetails/:id',ProductControllerr.getproductdetails)
router.patch('/updateproduct/:id',ProductControllerr.productupdate)



module.exports = router