const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: String,
    category: {type:String, default: ""},
    title: {type:String, default: ""},
    dateStart: {type: String, default: ""},
    dateEnd: {type:String, default: ""},
    priority: {type: String, default: ""},
    status: {type:String, default: ""},
    description: {type:String, default: ""},
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'registers' } 
})

const taskModel = mongoose.model("tasks", taskSchema)

module.exports = taskModel