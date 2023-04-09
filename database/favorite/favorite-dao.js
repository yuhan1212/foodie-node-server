const favoriteModel = require('./favorite-model');


const isFavorite = (userId, recipeId) => {
    return favoriteModel.countDocuments({userId, recipeId});
}

const findFavoritesByUserId = (userId) => {
    return favoriteModel.find({userId})
}

const addFavorite = (userId, recipeId, username, recipeName, recipeImg) => {
    return favoriteModel.create({userId, recipeId, username, recipeName, recipeImg});
}

const removeFavorite = (userId, recipeId) => {
    return favoriteModel.deleteOne({userId, recipeId});
}

const findAllFavorites = () => {
    return favoriteModel.find()
}

module.exports = {
    isFavorite,
    findFavoritesByUserId,
    addFavorite,
    removeFavorite,
    findAllFavorites,
}