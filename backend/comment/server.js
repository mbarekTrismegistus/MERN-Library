const express = require("express");
const comments = require("./modules/commentModule")
const connection = require("./config/connectDB")
const cors = require('cors')
require('dotenv').config() 



const app = express();

app.listen(3004, () => {
    console.log("comments service running")
})

connection();

app.use(express.json({limit: '10mb'}))


const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}

app.use(cors(corsOptions))


async function getComments(req, res, next){
    let data = await comments.find({book_id: req.params.id}).sort({updatedAt: "desc"})
    res.status(200).json(data)
    next()

}

async function addComment(req, res, next){
    let newComment = new comments(req.body.data)
    let data = newComment.save()
    res.status(200).json(data)
    next()
}


app.get("/books/:id/comments", getComments);
app.post("/books/comments", addComment);