const reviewSchema = require("./review-schema")
const mongoose = require("mongoose")
const reviewModel = mongoose.model("ReviewModel", reviewSchema)
module.exports = reviewModel
