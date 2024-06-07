const express = require("express");
const favorites = require("./modules/favModule")
const connection = require("./config/connectDB")
const cors = require('cors')
require('dotenv').config()



const app = express();

app.listen(3003, () => {
    console.log("favorite service running")
})

connection();

app.use(express.json({limit: '10mb'}))


const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}

app.use(cors(corsOptions))

async function addFavorite(req, res, next){
    let newFav = new favorites(req.body.data)
    let fav = await newFav.save()
    res.status(200).json(fav)
    next()
}

async function getFav(req, res, next){
    let fav = await favorites.findOne({user_id: req.body.data?.user_id, book_id: req.body.data?.book_id})
    let count = await favorites.countDocuments({book_id: req.body.data?.book_id}) 

    res.status(200).json({
        data: {
            fav: fav,
            count: count
        }
    }) 
    next()
}

async function removeFav(req, res, next){
    let resp = await favorites.findOneAndDelete({_id: req.params.id})
    res.status(200).json(resp)
    next()
}

app.post("/findfavorite", getFav)
app.post("/favorite", addFavorite)
app.delete("/favorite/:id", removeFav)