const dislikeModel = require('./dislike-model');


const isDislike = (userId, recipeId) => {
    return dislikeModel.countDocuments({userId, recipeId});
}

const findDislikesByUserId = (userId) => {
    return dislikeModel.find({userId})
}

const addDislike = (userId, recipeId, username, recipeName, recipeImg) => {
    return dislikeModel.create({userId, recipeId, username, recipeName, recipeImg});
}

const removeDislike = (userId, recipeId) => {
    return dislikeModel.deleteOne({userId, recipeId});
}

const findAllDislikes = () => {
    return dislikeModel.find()
}

module.exports = {
    isDislike,
    findDislikesByUserId,
    addDislike,
    removeDislike,
    findAllDislikes,
}