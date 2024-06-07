const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    image: String

},{
    collection: "user"
})

module.exports = mongoose.model("user", UserSchema)