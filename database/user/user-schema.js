const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String,
    phone: String,
    address: {type: Map, of: String},
    email: String,
    role: {type: String, enum: ["ADMIN", "MANAGER","USER"], default: "USER"},
    bio: String
}, {collection: "users", timestamps: true})

module.exports = userSchema