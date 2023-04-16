const mongoose  = require("mongoose");


const Schema = mongoose.Schema;

const PostSchema = new Schema({
    caption:String,
    image:{
        public_id:String,
        url:String,
    },
    Author:{
        type : mongoose.Schema.ObjectId,
        ref : "user",
        required: true,
    },
    likes:[
        {
            type: mongoose.Schema.ObjectId,
            ref: "user"
        }
    ],
    comments:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"user"
            },
            comment : {
                type:String,
                required : true
            }
        }
    ],
    createdAt: {
        type: String,
        default: function() {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1; // Note that month is zero-indexed
            var day = date.getDate();
            return year + '-' + month + '-' + day;
        }
    }
});

const PostModel = mongoose.model("post", PostSchema);

module.exports = PostModel;