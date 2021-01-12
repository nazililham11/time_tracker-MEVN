const TimeRecord = require('../models/timeRecord');
const autoStopLastRecord = true

const findLastRecord = async () => {
    return await TimeRecord.findOne({}, {}, { sort: { dateCreated: -1 } })
}

const finishLastRecord = async () => {
    const lastRecord = await findLastRecord()
    if (lastRecord && !lastRecord.timeFinish){
        await TimeRecord.updateOne(
            { _id: lastRecord._id }, 
            { $set: { timeFinish: Date.now() } }
        )
        console.log(`Record ${lastRecord._id} updated`)
    }
    return lastRecord
}

const compactRecords = (records) => {
    records.map(e => {
        if (e.project){
            e.project.__v = undefined
            e.project.description = undefined
            e.project.dateCreated = undefined
        } 
        if (e.category){
            e.category.__v = undefined
            e.category.description = undefined
            e.category.dateCreated = undefined
        }
        e.__v = undefined
        e.dateCreated = undefined
        return e
    })
    return records
}

const create = async (req, res) => {
    try {
        const { description, project, category, timeStart, timeFinish } = req.body
        const data = { description, project, category, timeStart, timeFinish } 
        if (autoStopLastRecord){
            await finishLastRecord()
        }
        const record = await TimeRecord.create(data)
        console.log(`Record ${record._id} created`)
        res.send(record)
    } catch(e){
        res.status(500).json(e)
    }
}

const find = async (req, res) => {
    try {
        const records = await TimeRecord.find().populate(['project', 'category'])
        const compact = compactRecords(records)
        res.send(compact)
    } catch(e){
        res.status(500).json(e)
    }
}

const remove = async (req, res) => {
    try {
        const record = await TimeRecord.findOneAndRemove({ _id: req.query.id })
        console.log(`Record ${record._id} deleted`)
        res.send(record)
    } catch(e){
        res.status(500).json(e)
    }
}

const update = async (req, res) => {
    try {
        const { id, title, description, project, category, timeStart, timeFinish } = req.body
        const record = await TimeRecord.findOneAndUpdate(
            { _id: id }, 
            { $set: { title, description, project, category, timeStart, timeFinish } }
        )
        console.log(`Record ${record._id} updated`)
        res.send(record)
    } catch(e){
        res.status(500).json(e)
    }
}

module.exports = {
    create,
    find,
    remove,
    update 
}
