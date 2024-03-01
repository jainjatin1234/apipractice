const express = require('express')
const CategoryController = require('../controller/CategoryController')
const OrderController = require('../controller/OrderController')
const PaymentController = require('../controller/PaymentController')
const ProductControllerr = require('../controller/ProductControllerr')
const Usercontroller = require('../controller/Usercontroller')
const checkauth = require('../middleware/auth')
const router = express.Router()


router.get('/me',checkauth,Usercontroller.getuserdetails)
router.get('/getuser',Usercontroller.getuser)
router.post('/userinsert',Usercontroller.userinsert)
router.post('/verifylogin',Usercontroller.verifylogin)
router.get('/logout',Usercontroller.logout)
router.post('/updateprofile',checkauth,Usercontroller.updateprofile)

router.post('/updatepassword',checkauth,Usercontroller.updatepassword)

router.delete('/deleteuser'),Usercontroller.DeleteUser
router.get('/getsingleuser/:id'),Usercontroller.getsingleuser


router.get('/getcategory', CategoryController.getcategory)
router.post('/insertcategory', CategoryController.insertcategory)
router.delete('/deletecategory/:id',CategoryController.deletecategory)


router.get('/getproduct', ProductControllerr.getproduct)
router.post('/insertproduct', ProductControllerr.insertproduct)
router.delete('/deleteproduct/:id',ProductControllerr.deleteproduct)
router.get('/getproductdetails/:id',ProductControllerr.getproductdetails)
router.get('/getdetails/:id',ProductControllerr.getdetails)
router.patch('/updateproduct/:id',ProductControllerr.productupdate)


//payment controller
//PaymentController
router.post('/payment/process', checkauth, PaymentController.processpayment)
router.get('/stripeapiKey', PaymentController.sendStripApiKey)


//ordercontroller
router.post('/createorder',checkauth,OrderController.createorder)
router.post('/order/getsingleuser/:id',OrderController.getsingleorder)
router.get('/order/myorder',OrderController.myorder)
router.get('/order/getallorders',OrderController.getallorders)
router.get('/order/deleteorder/:id',OrderController.deleteorder)




module.exports = router