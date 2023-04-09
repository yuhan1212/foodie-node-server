const userModel = require("./user-model")

const register = (user) => {
    return userModel.create(user);
}

const findUserByCredentials = (email, password) => {
    return userModel.findOne({email, password});
}

const findUserByUsername = (username) => {
    return userModel.find({username: username});
}

const findUserByEmail = (email) => {
    return userModel.find({email: email});
}

const findUserById = (uid) => {
    return userModel.findById(uid)
}

const findAllUsers = () => {
    return userModel.find()
}

const deleteUser = (uid) => {
    return userModel.deleteOne({_id: uid})
}

const updateUser = (user) => {
    return userModel.updateOne({_id: user._id}, {$set: user});
}

module.exports = {
    register,
    findUserByCredentials,
    findUserByUsername,
    findUserByEmail,
    findUserById,
    findAllUsers,
    deleteUser,
    updateUser
}