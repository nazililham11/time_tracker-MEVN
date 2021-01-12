const mongoose = require('mongoose')

const ProjectSchema = mongoose.Schema({
    title: { type: String, required: true },
    color: { type: String, required: true },
    description: { type: String, default: "" },
    dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Project', ProjectSchema)