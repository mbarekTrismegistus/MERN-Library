const express = require("express");
const users = require("./modules/userModule")
const connection = require("./config/connectDB")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const imgbbUploader = require("imgbb-uploader")
require('dotenv').config()



const app = express();

app.listen(3001, () => {
    console.log("auth running")
})

connection();




const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}

app.use(cors(corsOptions))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());

async function auth(req,res,next){
    let userData =  await users.findOne({username: req.body.data.username})
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
    let base64img
    let imgdata

    if(req.body.data.image){
        base64img = req.body.data.image.substr(req.body.data.image.indexOf(',') + 1);

        const options = {
            apiKey: "b89e645579bd4ed0af6eea6394c431cd", 
            base64string: base64img,
        };

        imgdata = await imgbbUploader(options)
        
    }

    let user
    let error
    
    let newUser = new users({
        ...userData,
        image: imgdata?.url || "",
    })
    try {
        user = await newUser.save()

    } catch (err) {
        error = err
        console.log(error)
    }

    if(user){
        console.log("no error")
        res.status(200).json(user)
        next()
    }
    else if(error){
        res.status(409).json(error)
        next()
    }
    else{
        console.log("error")
        res.status(500).json("random error happenen :(")
        next()
    }
}


app.post("/auth", auth)
app.post("/auth/registre", registre)







