const ProductModel = require("../modls/Productt");
const cloudinary = require("cloudinary").v2;

//cloudinary setup
cloudinary.config({
  cloud_name: "dlfiha3il",
  api_key: "298518693242975",
  api_secret: "T_6T7Lm0qY047jiiCKnH-VqvkwA",
});

class ProductControllerr {
  static insertproduct = async (req, res) => {
    try {
      //upload image
      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "productimage",
      });

      const result = new ProductModel({
        name: req.body.name,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url,
        },
        price:req.body.price,
      });
      await result.save();
      console.log(result);
      res.status(201).json({
        status: "success",
        message: "Registration Successfully 😃🍻",
      });
    } catch (err) {
      console.log(err);
    }
  };

  static getproduct = async (req, res) => {
    try {
      const data = await ProductModel.find();
      console.log(data);
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static deleteproduct = async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.id);
      //code of deleting the image
      const image_id = product.image.public_id;
      // console.log(image_id)
      await cloudinary.uploader.destroy(image_id);

      await ProductModel.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: "deleted successfully",
        message: "  Successfully user deleted 🥂🍻",
      });
    } catch (err) {
      console.log(err);
    }
  };


  static getproductdetails = async(req,res){
    try{

      const data = await ProductModel.findById(req.params.id)
      res.status(200).json({
        success:true,
        data,
      })

    }catch(err){
      console.log(err)
    }
  } 
}

module.exports = ProductControllerr;
