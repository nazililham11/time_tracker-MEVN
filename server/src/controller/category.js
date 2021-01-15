const Category = require('../models/category')
const TimeRecord = require('../models/timeRecord')
const saveRemove = true

const removeRecordByCategory = async (categoryId) => {
    const records = await TimeRecord.find({ category: categoryId })
    for (record of records){
        await TimeRecord.deleteOne({ _id: record._id })
        console.log(`Record ${record._id} deleted`)
    }
    return records
}

const create = async (req, res) => {
    try {
        const { title, color, description } = req.body
        const category = await Category.create(
            { title, color, description }
        )
        console.log(`Category ${category._id} created`)
        res.send(category)
    } catch(e){
        res.status(500).json(e)
    }
}

const find = async (req, res) => {
    try {
        const categories = await Category.find().sort({ title: 1 })
        res.send(categories)
    } catch(e){
        res.status(500).json(e)
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.query
        const category = await Category.deleteOne({ _id: id })
        console.log(`Category ${category._id} deleted`)
        if (saveRemove){
            const records = await removeRecordByCategory(id)
            res.send({ category, records }) 
        } else {
            res.send({ category })
        }
    } catch(e){
        res.status(500).json(e)
    }
}

const update = async (req, res) => {
    try {
        const { id, title, color, description } = req.body
        const category = await Category.findOneAndUpdate(
            { _id: id }, 
            { $set: { id, title, color, description } }
        )
        console.log(`Category ${category._id} updated`)
        res.send(category)
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
