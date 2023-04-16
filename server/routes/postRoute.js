const express = require("express")
const router = express.Router();
const controller  = require("../controller/PostController")
const TokenVerify = require("../middleware/TokenVerify")





router.post("/postcreate" , TokenVerify, controller.createPost);

router.get("/mypost" , TokenVerify, controller.Myposta);

router.get("/likedislike/:id",  TokenVerify, controller.likeDislike)

router.delete("/deletepost/:id",  TokenVerify, controller.deletePost)

router.put("/addcomment/:id",  TokenVerify, controller.addcomment
)
router.delete("/deletecomment/:id",  TokenVerify, controller.deleteComment)




module.exports = router;