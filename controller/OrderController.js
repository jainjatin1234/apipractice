const OrderModel = require("../modls/Order")

class OrderController{

    static createorder = async(req,res)=>{
        try{
            console.log(req.body)
            const {shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice,totalPrice,shippingPrice} = req.body
            const order = await OrderModel.create({
                shippingInfo,
                orderItems,
                paymentInfo,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
                paidAt: Date.now(),
                user:req.admin._id
            })

            res.status(200).json({status: "success", message: "order added succesfully", order})

        }catch(error){
            console.log(error)
        }
    }

    static getsingleorder = async(req,res)=>{
        try{
            const data = await OrderModel.findById(req.params.id)
            res.status(200).json({
                status: 'success', data
            })

        }catch(error){
            console.log(error)
        }
}


//in myorder user can watch its order
    static myorder = async(req,res)=>{
        try{
         const order = await OrderModel.find()
         res.status(200).json({
            status: 'success', data
        })
        }
        catch(error){
            console.log(error)
           } 
    }


    //for admin(admin get  all orders)
    static getallorders = async(req,res)=>{
        try{
         const order = await OrderModel.find()
         res.status(200).json({
            status: 'success', data
        })
        }
        catch(error){
            console.log(error)
           } 
    }

static deleteorder = async(req,res)=>{
    try {
        const order = await OrderModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: 'success', data
        })
    } catch (error) {
        console.log(error)
        
    }
}

}
module.exports = OrderController