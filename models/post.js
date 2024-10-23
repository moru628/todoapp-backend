const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: String,
    imageUrl: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'registers', required: true },
    name: String,
    profileImg: String 
})

const postModel = mongoose.model("posts",postSchema)

module.exports = postModel