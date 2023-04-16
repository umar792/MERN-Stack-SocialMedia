 const jwt= require("jsonwebtoken");
 const UserModel = require("../models/UserSchema")

 const TokenVerify = async(req,res,next)=>{
    try {

        // const {token} = req.cookies;
        const token = req.headers["token"]

        if(!token){
            return res.status(400).json({
                success : false,
                message : "Please Login First"
            })
        }
        const decoded = await jwt.verify(token , process.env.JWT_SECRET);
        req.user = await UserModel.findById(decoded.id);
        next()
        
    } catch (error) {
        res.status(200).json({
            success : true,
            message : error.message
        });
    }
 }

 module.exports = TokenVerify;