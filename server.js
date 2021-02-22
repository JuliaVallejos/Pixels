const cors= require("cors");
require("dotenv").config();
// require('./db');
const express=require("express");
const router=require("./routes/index");
const fileUpload =require("express-fileupload");
require("./config/database");


const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.use("/api",router);
const port=process.env.PORT;

const host=process.env.HOST || '0.0.0.0';

app.listen(port,host,()=>console.log("App listening on port 4000"))