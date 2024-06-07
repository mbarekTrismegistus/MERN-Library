const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: String,
    username: String,
    book_id: String,
    user_image: String,

},{
    collection: "comments",
    timestamps: true
})

module.exports = mongoose.model("comments", commentSchema)