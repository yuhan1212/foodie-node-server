const mongoose = require('mongoose');
const userSchema = require('./dislike-schema');

const dislikeSchema = mongoose.model('DislikeModel', userSchema);

module.exports = dislikeSchema;