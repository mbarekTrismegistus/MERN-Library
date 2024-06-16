const mongoose = require("mongoose");

const demandSchema = new mongoose.Schema({
    userId: String,
    authour: String,
    title: String,

},{
    collection: "demands",
    timestamps: true
})

module.exports = mongoose.model("demands", demandSchema)