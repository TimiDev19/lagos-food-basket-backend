const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    cloudinary_id: {
        type: String,
    },
})

module.exports = mongoose.model("User", userSchema)