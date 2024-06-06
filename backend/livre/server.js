const express = require("express");
const books = require("./modules/bookModule")
const connection = require("./config/connectDB")
const cors = require('cors')
const imgbbUploader = require("imgbb-uploader")
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


async function getBooks(req, res, next){
    let booksData  = await books.find()
    res.status(200).json({booksData: booksData})
    next()
}

async function getBook(req, res, next){
    let bookData  = await books.findOne({_id: req.params.id})
    res.status(200).json({bookData: bookData})
    next()
}

async function deleteBook(req, res, next){
    let response = await books.findOneAndDelete({_id: req.params.id})
    res.status(200).json({message: response})
    next()
}

async function addBook(req,res, next){
    let bookData = req.body.data;
    
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
    let newBook = new books({
        ...bookData,
        image: imgdata?.url || "",
    })
    let book = await newBook.save()
    if(book){
        res.status(200).json(book)
        next()
    }
    else{
        res.status(500).json("something went wrong :(")
    }
}

async function updateBook(req, res, next){
    let base64img
    let imgdata
    let data = req.body.data

    if(req.body.data.image){
        base64img = req.body.data.image.substr(req.body.data.image.indexOf(',') + 1);

        const options = {
            apiKey: "b89e645579bd4ed0af6eea6394c431cd", 
            base64string: base64img,
        };

        imgdata = await imgbbUploader(options)
        data = {
            ...req.body.data,
            image: imgdata?.url || ""
        }
    }
    let response = await books.findOneAndUpdate({_id: req.params.id},req.body.data)
    res.status(200).json({message: response})
    next()
}

app.get("/books", getBooks)
app.get("/books/:id", getBook)
app.post("/books/edit/:id", updateBook)
app.delete("/books/:id", deleteBook)
app.post("/books", addBook)
