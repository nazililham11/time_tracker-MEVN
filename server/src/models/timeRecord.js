const mongoose = require('mongoose')

const TimeRecordSchema = mongoose.Schema({
    description: { type: String, default: "" },
    project: { type: mongoose.Schema.Types.ObjectId, ref:'Project' },
    category: { type: mongoose.Schema.Types.ObjectId, ref:'Category' },
    timeStart: { type: Number, required: true },
    timeFinish: { type: Number, default: undefined },
    dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('TimeRecord', TimeRecordSchema)