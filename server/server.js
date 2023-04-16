const experess = require("express");
const app = experess();


// ---------- dotenv 
require("dotenv").config();

// ----------
const cors = require("cors");
app.use(cors())

// ---------- cookie parse  
const cookieparsr = require("cookie-parser");
app.use(cookieparsr());


// ===============bodyParser 
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// ==== mongoose coonection 
const mongooseConnection = require("./db/conn");
mongooseConnection();


// ---------------- router 
app.use("/" , require("./routes/userRoutes"))
app.use("/" , require("./routes/postRoute"))

app.listen(process.env.PORT, ()=>{
    console.log(`app is runnning on PORT ${process.env.PORT}`);
})