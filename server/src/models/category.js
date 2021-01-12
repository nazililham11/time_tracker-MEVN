const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    title: { type: String, required: true },
    color: { type: String, required: true },
    description: { type: String, default: "" },
    dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Category', CategorySchema)