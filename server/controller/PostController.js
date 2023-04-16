const postmodel = require("../models/PostSchema");
const UserModel = require("../models/UserSchema")

module.exports = {

    createPost : async (req,res)=>{
        try {

            const postData = {
                caption:  req.body.caption,
                image:{
                    public_id : "jdgbfdg",
                    url : "dbysxusdfv"
                },
                Author : req.user._id
            }

            const newPost = await postmodel.create(postData);
            const user = await UserModel.findById(req.user._id)
            user.posts.push(newPost._id);
            await user.save();
            res.status(200).json({
                success : true,
                message : "Post created successfuly",
            })
            
        } catch (error) {
            res.status(400).json({
                success : false,
                message : error.message
            })
        }
    },




    // ------------------- delete post 


    deletePost : async(req,res)=>{
        try {

            const post = await postmodel.findById(req.params.id);
            if(!post){
                return res.status(400).json({
                    success : false,
                    message : "Psot not found"
                })
            };
            
            if(post.Author.toString() !== req.user._id.toString()){
                return res.status(400).json({
                    success : false,
                    message : "you cannot delete this post"
                })
            }

            await post.deleteOne();

            const user = await UserModel.findById(req.user._id);
            const index = await user.posts.indexOf(req.params.id);
            await user.posts.splice(index,1);
            await user.save();

            res.status(200).json({
                success : true,
                message : "Post Deleted Successfuly"
            })





        } catch (error) {
            res.status(400).json({
                success : false,
                message : error.message
            })
        }
    },

    // ---- like unlike post

    likeDislike : async(req,res)=>{
       try {

        const post  = await postmodel.findById(req.params.id);
        if(!post){
            return res.status(400).json({
                success : false,
                message : "Psot not found"
            })
        };

        if(post.likes.includes(req.user._id)){
            const index = await post.likes.indexOf(req.user._id);
            await post.likes.splice(index,1);
            await post.save();
            res.status(200).json({
                success : true,
                message : "Post Unlike"
            })
        }else{
            await post.likes.push(req.user._id);
        await post.save();
        res.status(200).json({
            success : true,
            message : "Post like"
        })
        }

        

        
       } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
       }
    },



    // -------------- comment 

    addcomment : async(req,res)=>{
        try {

            const post = await postmodel.findById(req.params.id);

            if(!req.body.comment){
                return res.status(400).json({
                    success : false,
                message : "Please Enter Comment"
                })
            }

            if(!post){
                return res.status(400).json({
                    success : false,
                    message : "Post not found"
                })
            };

            let Existindex = -1;

            post.comments.forEach((item,index)=>{

                if(item.user.toString() === req.user._id.toString()){
                    Existindex = index
                }
            });
             
            if(Existindex !== -1){
                   post.comments[Existindex].comment = req.body.comment ;
                   await post.save();
                   res.status(200).json({
                    success : true,
                    message : "Comment update successfuly"
                   })
            }else{
                post.comments.push({
                    user : req.user._id,
                    comment : req.body.comment
                })
                await post.save();
                res.status(200).json({
                 success : true,
                 message : "Comment Add successfuly"
                })
            }

            
        } catch (error) {
            res.status(400).json({
                success : false,
                message : error.message
            })
        }
    },



    // --------------- delete comment 

    deleteComment : async(req,res)=>{
        try {

            const post = await postmodel.findById(req.params.id);
            
            if(!post){
                return res.status(400).json({
                    success : false,
                    message : "Post not found"
                })
            };


            if(post.Author.toString === req.user._id.toString()){

                if(req.body.commentid === undefined){
                    return res.status(400).json({
                        success : true,
                        message : "comment Id is requireds"
                     })
                }

                post.comments.forEach((item,index)=>{
                    if(item._id.toString() === req.body.commentid.toString()){
                        return post.comments.splice(index,1);
                    }
                })
                
                await post.save();
                res.status(200).json({
                   success : true,
                   message : "comment Deleted"
                })

            }else{

                post.comments.forEach((item,index)=>{
                    if(item.user.toString() === req.user._id.toString()){
                        post.comments.splice(index,1);
                     return  res.status(200).json({
                            success : true,
                            message : "Your comment Deleted"
                         })
                    }else{
                        res.status(200).json({
                            success : true,
                            message : "Your connot Deleted this comment"
                         })
                    }
                });

                 await post.save();
              
            }

            
        } catch (error) {
            res.status(400).json({
                success : false,
                message : error.message
            })
        }
    },


    // ------------------ mypost 

    Myposta : async(req,res)=>{
        try {

            const posts = await postmodel.find({Author : req.user._id}).populate("likes comments.user Author");
            res.status(200).json({
                success : true,
                posts
            })
            
        } catch (error) {
            res.status(400).json({
                success : false,
                message : error.message
            })
        }
    }



}