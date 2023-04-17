
const reviewModel = require("./review-model")

const findAllReviews = () => {
    return reviewModel.find().exec()
}

const findReviewsByMeal = (mealId) => {
    return reviewModel.find({mealId: mealId}).populate("users").exec()
}

const createReviewForMeal = (mealId, textArea, username, mealName, mealImg, userId) => {
    return reviewModel.create({mealId, textArea, username, mealName, mealImg, userId})
}

const findReviewById = (reviewId) => {
    return reviewModel.findById(reviewId)
}

const findReviewsByUsername = (username) => {
    if(username) {
        return reviewModel.find({username});
    }
}

const deleteReview = (mealId, reviewId) => {
    return reviewModel.deleteOne({mealId, _id: reviewId});
}

module.exports = {
    findAllReviews, findReviewsByMeal, createReviewForMeal, findReviewById, findReviewsByUsername, deleteReview
}


