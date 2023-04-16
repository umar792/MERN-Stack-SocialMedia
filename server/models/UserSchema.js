const mongoose  = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required: [true, "Please Enter Your Name"],
        trim:true
    },
    email:{
        type:String,
        required:[true, "Please Enter Your Email"],
        unique: [true , "Email Already Present"],
        validate: [validator.isEmail, "Plaese Enter valid Email Adress"],
    },
    password : {
        type:String,
        required: [true , "Please Enter Your Password"],
        minLenght : [6 , "Passwrod must be up to 6 character"],
    },
    avatar:{
        public_id:{
            type : String,
            required : true
        },
        url:{
            type : String,
            required : true
        }
    },
    posts:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "post"
        }
    ],
    follower:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
});


userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
})
const UserModel = mongoose.model("user", userSchema);
module.exports= UserModel;