const mongoose = require("mongoose")
const reviewSchema = new mongoose.Schema({
    mealId: String,
    textArea: String,
    username: {
        type: mongoose.Schema.Types.String,
        ref: "UserModel"
    },
    userId: String,
    mealName: String,
    mealImg: String
}, {collection: "reviews", timestamps: true})

module.exports = reviewSchema
