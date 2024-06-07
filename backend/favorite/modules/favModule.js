const mongoose = require("mongoose");

const favSchema = new mongoose.Schema({
    user_id: String,
    book_id: String,

},{
    collection: "favorites",
    timestamps: true 
})

module.exports = mongoose.model("favs", favSchema)