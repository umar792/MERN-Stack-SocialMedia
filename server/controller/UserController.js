const UserModel = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const postModel = require("../models/PostSchema")

module.exports = {

    createUser : async(req,res)=>{
        try {
            const {name,email,password} = req.body;
            if(!name){
                return res.status(400).json({
                    success : false,
                    message : "Please Enter Your Name"
                })
            } 
            if(!email){
                return res.status(400).json({
                    success : false,
                    message : "Please Enter Your email"
                })
            } 
            if(!password){
                return res.status(400).json({
                    success : false,
                    message : "Please Enter Your password"
                })
            } 

            const ExistUser = await UserModel.findOne({email});
            if(ExistUser){
                return res.status(400).json({
                    success : false,
                    message : "Email Already Exist Please Login"
                })
            } 
            req.body.avatar = {
                public_id : "shiudghuigdugd",
                url : "gidguigdtgw8etg87te87ge"
            }
            await UserModel.create(req.body)

            res.status(200).json({
                success : true,
                message : "Registration Successfuly"
            });

        } catch (error) {
             res.status(200).json({
                success : true,
                message : error.message
            });
        }
    },

    // ------------------ login 

    loginUser : async (req,res)=>{
        try {

            const {email , password} = req.body;
            if(!email){
                return res.status(400).json({
                    success : false,
                    message : "Please Enter Your email"
                })
            } 
            if(!password){
                return res.status(400).json({
                    success : false,
                    message : "Please Enter Your password"
                })
            }

            const user = await UserModel.findOne({email});
            if(!user){
                return res.status(400).json({
                    success : false,
                    message : "User Not Found"
                })
            }
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({
                    success : false,
                  message : "Please Enter a Valid Email or Password"
                })
            }

            const Token = await jwt.sign({id:user._id}, process.env.JWT_SECRET,{
                expiresIn : "30d"
            })

            res.status(200).cookie("token"  , Token).json({
                success : true,
                message : "Login Successfuly",
                Token
            })
        } catch (error) {
            res.status(200).json({
                success : true,
                message : error.message
            });
        }
    },


    // ----------------- profile 

    profile : async(req,res)=>{
     try {

        const user = await UserModel.findById(req.user._id);
        res.status(200).json({
            success : true,
            user
        })
        
     } catch (error) {
        res.status(200).json({
            success : true,
            message : error.message
        });
     }
    },


    // ------------- allusrs 

    Allusers : async(req,res)=>{
        try {
   
           const users = await UserModel.find();
           res.status(200).json({
               success : true,
               users
           })
           
        } catch (error) {
           res.status(200).json({
               success : true,
               message : error.message
           });
        }
       },
   


    // ---------------- follower 

    followeruser : async(req,res)=>{
        try {

            const followeruser = await UserModel.findById(req.params.id);
            const loginuser = await UserModel.findById(req.user._id);
            if(!followeruser){
                return res.status(400).json({
                    success : false,
                    message :  "User not found"
                })
            } ;


            if(followeruser.follower.includes(req.user._id)){
                const followindex = followeruser.follower.indexOf(req.user._id);
                const loginindex= followeruser.following.indexOf(followeruser._id);

                await followeruser.follower.splice(followindex,1);
                await loginuser.following.splice(loginindex,1);
                await followeruser.save();
                await loginuser.save();

                res.status(200).json({
                    success : false,
                    message : "user unfollow"
                })
            }else{
                await followeruser.follower.push(loginuser._id);
                await loginuser.following.push(followeruser._id);
                await followeruser.save();
                await loginuser.save();
    
                res.status(200).json({
                    success : true,
                    message : "User Followed"
                })
            }
            
           
        } catch (error) {
            res.status(200).json({
                success : true,
                message : error.message
            });
        }
    },



    // ------------------ get following user post ;
    
    getfollowingpost : async(req,res)=>{
        try {
            const user = await UserModel.findById(req.user._id);
        const posts = await postModel.find({
            Author : {
                $in : user.following
            }
        }).populate("Author comments.user likes");
        res.status(200).json({
            success : true,
            posts:posts.reverse()
        })
            
        } catch (error) {
             res.status(200).json({
                success : true,
                message : error.message
            });
        }
    },


    // ------------ password update 

    updatePassword : async(req,res)=>{
        try {

            const user = await UserModel.findById(req.user._id);
            const {oldpassword , newpassword} = req.body;
            if(!oldpassword || !newpassword){
                return res.status(400).json({
                    success : false,
                    message : "Please Enter New and Old password"
                })
            }
            
            const isMatch = await bcrypt.compare(oldpassword , user.password);
            if(!isMatch){
                return res.status(400).json({
                    success : false,
                    message : "old password not match"
                })
            }

            user.password = newpassword;
            await user.save()

            res.status(200).json({
                success : true,
                message : "Password Update Successfuly"
            })
            
        } catch (error) {
            res.status(200).json({
                success : true,
                message : error.message
            });
        }
    },



    // -------------- profileUpdate 

    profileupdate : async(req,res)=>{
        try {

            const user = await UserModel.findById(req.user._id);
            const {name , email} = req.body;
            if(!name || !email){
                return res.status(400).json({
                    success : false,
                    message : "Please Enter Name or email"
                })
            }
            user.name = name;
            user.email = email;

            // ----------------- avatar 



            
            await user.save();
            res.status(200).json({
                success : false,
                message : "Profile Updated"
            })
            
        } catch (error) {
            res.status(200).json({
                success : true,
                message : error.message
            });
        }
    }

}