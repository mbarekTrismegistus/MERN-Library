const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    password: String,

},{
    collection: "user"
})

module.exports = mongoose.model("user", UserSchema)