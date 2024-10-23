const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profileImg: { type: String, default: "" },
    description: { type: String, default: "" },
    topic: { type: [String], default: [] } ,
    followedFriends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'registers' }] 
})

const registerModel = mongoose.model("registers", registerSchema)

module.exports = registerModel