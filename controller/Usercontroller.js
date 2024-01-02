const UserModel = require("../modls/User");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

//cloudinary setup
cloudinary.config({
  cloud_name: "dlfiha3il",
  api_key: "298518693242975",
  api_secret: "T_6T7Lm0qY047jiiCKnH-VqvkwA",
});

class Usercontroller {
  static getuser = async (req, res) => {
    try {
      const users = await UserModel.find();
      // console.log(users)
      res.status(201).json({
        status: "success",
        message: "successfull",
        users,
      });
    } catch (err) {
      console.log(err);
    }
  };

  static getuserdetails = async (req, res) => {
    try {
      // const {id,name,email} = req.admin
      // const user = await UserModel.findById(id);
      const user = await UserModel.findById(req.admin.id);
      // console.log(users)
      res.status(201).json({
        status: "success",
        message: "successfull",
        user,
      });
    } catch (err) {
      console.log(err);
    }
  };


  static userinsert = async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;
    const image = req.files.image;
    //  console.log(image)
    const imageupload = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "profileimageapi",
    });
    //console.log(imageupload)

    const user = await UserModel.findOne({ email: email });
    // console.log(user)
    if (user) {
      res
        .status(401)
        .json({ status: "failed", message: "ᴛʜɪꜱ ᴇᴍᴀɪʟ Is already exist" });
    } else {
      if (name && email && password && confirmpassword) {
        if (password == confirmpassword) {
          try {
            const hashpassword = await bcrypt.hash(password, 10);
            //console.log(hashpassword);
            const result = new UserModel({
              name: name,
              email: email,
              password: hashpassword,
              image: {
                public_id: imageupload.public_id,
                url: imageupload.secure_url,
              },
            });

            await result.save();
            res.status(201).json({
              status: "success",
              message: "Registration Successfully 😃🍻",
            });
          } catch (error) {
            console.log(error);
          }
        } else {
          res.status(401).json({
            status: "failed",
            message: "password & confirmpassword does not match",
          });
        }
      } else {
        res
          .status(401)
          .json({ status: "failed", message: "all field required" });
      }
    }
  };


  static verifylogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });

        if (user != null) {
          const isMatched = await bcrypt.compare(password, user.password);
          if (isMatched) {
            const token = jwt.sign(
              { ID: user._id },
              "jatin12345"
            );
            // console.log(token)
            res.cookie("token", token);
            res.status(201).json({
              status: "success",
              message: "successful",
              token: token,
              user,
            });
          } else {
            res
              .status(401)
              .json({
                status: "failed",
                message: "email or password is not valid",
              });
          }
        } else {
          res
            .status(401)
            .json({ status: "failed", message: "you are not register user" });
        }
      } else {
        res
          .status(401)
          .json({ status: "failed", message: "all field required" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  static logout = async(req,res)=>{
    try{
      res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true,
      })

      res.status(200).json({
        success:true,
        message:"Logged out"
      })

    }
    catch(error){
      console.log(error)
    }
  }


  static updatepassword = async (req, res) => {
    try {
        // const { id } = req.admin
        const { old_password, new_password, cpassword } = req.body;
        if (old_password && new_password && cpassword) {
            const user = await UserModel.findById(req.admin.id);
            const ismatch = await bcrypt.compare(old_password, user.password);
            if (!ismatch) {
                res
                    .status(401)
                    .json({ status: "failed", message: "old password is incorrect" });
            } else {
                if (new_password !== cpassword) {
                    res
                        .status(401)
                        .json({ status: "failed", message: "  Password and confirm password do not match" });

                } else {
                    const newHashpassword = await bcrypt.hash(new_password, 10);
                    await UserModel.findByIdAndUpdate(req.admin.id, {
                        $set: { password: newHashpassword },
                    });
                    res.status(201).json({
                        status: 'success',
                        message: 'PASSWORD UPDATED SUCCESSFULLY 😃',
                        
                    })

                }
            }
        } else {
            return res.status(400).json({
                status: 'failed',
                message: 'All fiels required',
            })
        }
    } catch (error) {
        console.log(error)
      }

    }

    static updateprofile = async(req,res)=>{
      const {id} = req.params
      const {name,email,age} = req.body
      try{
          
          if (req.files) {
  
              //deleting the image
                const user = await usermodel.findById(req.admin.id)
                const imageid = user.image.public_id
    
                // console.log(imageid)
    
                await cloudinary.uploader.destroy(imageid)
    
    
    
                //second update,age
    
                const imagefile = req.files.image
                //image upload code
                const myImage = await cloudinary.uploader.upload(imagefile.tempFilePath, {   
                    folder: "profileimageap2"
                })
    
    
                var data = {
                  name:name,
                  email:email,
                    image: {
                        public_id: myImage.public_id,
                        url: myImage.secure_url
                    }
                }
    
            } else {
                var data = {
                   
                name:name,
                email:email,
    
                }
            }
           const result =  await usermodel.findByIdAndUpdate(req.admin.id, data)
          res.status(201).json({
            success:true,
            message:'profile updated successfully',
            result
          })
      }catch(err){
          console.log(err)
          // res.send(400).json({error:err.message})
      }
  }



    
     static getsingleuser = async (req, res) => {
      try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json({
          success: true,
          user,
        });
      } catch (error) {
        console.log(error);
      }
    };
  


    //   //delete
    static DeleteUser = async (req, res) => {
      try {
        const userDelete = await UserModel.findById(req.params.id);
  
        if (!userDelete) {
          return res
            .status(500)
            .json({ status: "500", message: "user not !! found  😪  " });
        }
        // To delete the data from database
        await UserModel.deleteOne(userDelete);
  
        res.status(200).json({
          status: "deleted successfully",
          message: "  Successfully user deleted 🥂🍻",
        });
      } catch (err) {
        console.log(err); 
      }
    };
  }
  //update Profile end

module.exports = Usercontroller;
