const express = require('express')
    , router = express.Router()
    , Category = require('./controller/category')
    , Project = require('./controller/project')
    , TimeRecord = require('./controller/timeRecord')


// Api
router.get('/project', Project.find)
router.post('/project', Project.create)
router.delete('/project', Project.remove)
router.put('/project', Project.update)

router.get('/category', Category.find)
router.post('/category', Category.create)
router.delete('/category', Category.remove)
router.put('/category', Category.update)

router.get('/record', TimeRecord.find)
router.post('/record', TimeRecord.create)
router.delete('/record', TimeRecord.remove)
router.put('/record', TimeRecord.update)


module.exports = router