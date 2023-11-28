const productModel = require("../modls/Product");
const ProductModel = require("../modls/Product");

const cloudinary = require("cloudinary").v2;

//cloudinary setup
cloudinary.config({
  cloud_name: "dlfiha3il",
  api_key: "298518693242975",
  api_secret: "T_6T7Lm0qY047jiiCKnH-VqvkwA",
});

class Productcontroller {
  static getproduct = async (req, res) => {
    try {
      const data = await productModel.find();
      // console.log(data)

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(err);
    }
  };

  static insertproduct = async (req, res) => {
    try {
      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "productimages",
      });

      const result = new ProductModel({
        name: req.body.name,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url,
        },
        products:req.body.products,
      });

      await result.save();
      // console.log(resukt)

      res.status(201).json({
        status: "success",
        message: "Registration Succesfully",
      });
    } catch (err) {
      console.log(err);
    }
  };

  static deleteproduct = async (req, res) => {
    try {
      // find product by id
      const product = await productModel.findById(req.params.id);
      // take imageid
      const image_id = product.image.public_id;
      // delete image
      await cloudinary.uploader.destroy(image_id);

      // delete product
      await productModel.findByIdAndDelete(req.params.id);

      res.status(200).json({
        status: "delete successfully",
        message: "  Successfully user deleted 🥂🍻",
      });
    } catch (error) {
      console.log(error);
    }
  };

  static getproductdetails = async(req,res)=>{
    try {
      const data = await ProductModel.findById(req.params.id)
      res.status(200).json({
        success:true,
        data
      })
      
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = Productcontroller;
