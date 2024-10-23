const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    sub_title: { type: String },
    location: { type: String },
    time: { type: String },
    category: { type: String }, 
})

module.exports = mongoose.model('events',eventSchema)