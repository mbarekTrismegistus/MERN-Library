const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: String,
    authour: String,
    description: String,
    image: String,
    likes: Number

},{
    collection: "books"
})

module.exports = mongoose.model("books", BookSchema)