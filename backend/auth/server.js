const express = require("express");
const users = require("./modules/userModule")
const connection = require("./config/connectDB")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config()



const app = express();

app.listen(3001, () => {
    console.log("auth running")
})

connection();

app.use(express.json())
app.use(cookieParser());

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}

app.use(cors(corsOptions))

async function auth(req,res,next){
    let userData =  await users.findOne({nom: req.body.data.username})
    if(userData){
        if(req.body.data.password === userData.password){
            let token = jwt.sign({userId: userData._id},process.env.AUTH_SECRET)
            res.cookie(userData._id, token, {httpOnly: true})
            res.status(200).json(userData)
            next()
        }
    }
    else{
        res.status(500).json("user not found")
        next()
    }
    
}

async function registre(req,res,next){
    let userData = req.body.data
    let newUser = new users(userData)
    let user = await newUser.save()
    if(user){
        res.status(200).json(user)
        next()
    }
    else{
        res.status(500).json("random error happenen :(")
        next()
    }
}


app.post("/auth", auth)
app.post("/auth/registre", registre)







