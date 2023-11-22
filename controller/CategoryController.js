const CategoryModel = require("../modls/Category");
const cloudinary = require("cloudinary").v2;

//cloudinary setup
cloudinary.config({
  cloud_name: "dlfiha3il",
  api_key: "298518693242975",
  api_secret: "T_6T7Lm0qY047jiiCKnH-VqvkwA",
});

class CategoryController {
  static insertcategory = async (req, res) => {
    try {
      //upload image
      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "categoryimage",
      });

      const result = new CategoryModel({
        name: req.body.name,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url,
        },
      });
      await result.save();
      console.log(result)
      res.status(201).json({
        status: "success",
        message: "Registration Successfully 😃🍻",
      });
    } catch (err) {
      console.log(err);
    }
  };

  static getcategory = async(req,res)=>{
    try {
      const data = await CategoryModel.find()
      console.log(data)
      res.status(200).json({
        success:true,
        data,
      })
      
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = CategoryController;
