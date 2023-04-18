const mongoose = require('mongoose');

const dislikeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    username: String,
    recipeId: String,
    recipeName: String,
    recipeImg: String
}, {collection: 'dislike'});

module.exports = dislikeSchema;