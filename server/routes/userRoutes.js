const express = require("express")
const router = express.Router();
const controller  = require("../controller/UserController")
const TokenVerify = require("../middleware/TokenVerify")

router.post("/registration" , controller.createUser);

router.post("/login" , controller.loginUser);

router.get("/me" , TokenVerify , controller.profile);

router.get("/allusers"  , controller.Allusers);

router.post("/followuser/:id" ,TokenVerify, controller.followeruser);

router.get("/followingpost" ,TokenVerify, controller.getfollowingpost);

router.put("/updatepass" ,TokenVerify, controller.updatePassword);

router.put("/updateProfile" ,TokenVerify, controller.profileupdate);




module.exports = router;