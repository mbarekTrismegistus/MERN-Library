const express = require("express");
const favorites = require("./modules/favModule")
const connection = require("./config/connectDB")
const cors = require('cors')
require('dotenv').config()



const app = express();

app.listen(3002, () => {
    console.log("book service running")
})

connection();

app.use(express.json({limit: '10mb'}))


const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}

app.use(cors(corsOptions))