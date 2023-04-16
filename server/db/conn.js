const mongoose = require("mongoose");


const mongooseConnection = () =>{
    mongoose.connect(process.env.BAS_URL).then(()=>{
        console.log("mongoose connect successfuly");
    }).catch((error)=>{
        console.log(error);
    })
}

module.exports = mongooseConnection;