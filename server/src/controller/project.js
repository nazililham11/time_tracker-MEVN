const Project = require('../models/project');
const TimeRecord = require('../models/timeRecord')
const saveRemove = true

const removeRecordByProject = async (projectId) => {
    const records = await TimeRecord.find({ project: projectId })
    for (record of records){
        await TimeRecord.deleteOne({ _id: record._id })
        console.log(`Record ${record._id} deleted`)
    }
    return records
}

const create = async (req, res) => {
    try {
        const { title, color, description } = req.body
        const project = await Project.create(
            { title, color, description }
        )
        console.log(`Project ${project._id} created`)
        res.send(project)
    } catch(e){
        res.status(500).json(e)
    }
}

const find = async (req, res) => {
    try {
        const projects = await Project.find().sort({ title: 1 })
        res.send(projects)
    } catch(e){
        res.status(500).json(e)
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.query
        const project = await Project.remove({ _id: id })
        console.log(`Project ${project._id} deleted`)
        if (saveRemove){
            const records = await removeRecordByProject(id)
            res.send({ project, records }) 
        } else {
            res.send({ project })
        }
    } catch(e){
        res.status(500).json(e)
    }
}

const update = async (req, res) => {
    try {
        const { id, title, color, description } = req.body
        const project = await Project.findByIdAndUpdate(
            { _id: id }, 
            { $set: { title, color, description }}
        )
        console.log(`Project ${project._id} updated`)
        res.send(project)
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
