const mongoose = require("mongoose")
const Schema = require("mongoose");

const reviewSchema = new mongoose.Schema({
    cocktailId: String,
    textArea: String,
    username: {
        type: mongoose.Schema.Types.String,
        ref: "UserModel"
    },
    userId: String,
    cocktailName: String,
    cocktailImg: String
}, {collection: "reviews", timestamps: true})

module.exports = reviewSchema
