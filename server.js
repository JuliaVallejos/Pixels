const cors= require("cors");
require("dotenv").config();
// require('./db');
const express=require("express");
const path=require("path");
const router=require("./routes/index");
const fileUpload =require("express-fileupload");
require("./config/database");


const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.use("/api",router);

if(process.env.NODE_ENV==="production"){
    console.log("adasdsadsad")
    app.use(express.static("client/build"))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname+"/cient/build/index.html"))
    })
}

const port=process.env.PORT;

const host=process.env.HOST || '0.0.0.0';

app.listen(port,()=>console.log("App listening on port 4000"))