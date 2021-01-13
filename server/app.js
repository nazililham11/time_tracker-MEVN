const express = require('express')
    , app = express()
    , cors = require('cors')
    , bodyParser = require('body-parser')
    , mongoose = require('mongoose')
    , utils = require('./src/utils')
    , port = 3300
    , dbAddress = "mongodb://127.0.0.1:27017/time-tracker"

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


// Database Connection 
mongoose.connect(
    dbAddress, 
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => err ? console.log('Error Connect to Database') : console.log('Database Connected')
)

// Routes
const routes = require('./src/routes')
app.use('/api', routes)


// Listen
app.listen(port, () => {
    var msg = `Time Tracker App listening at http://localhost:${port}`
    localIp = utils.getLocalIP()
    netInterface = localIp[Object.keys(localIp)[0]]
    
    if (netInterface && netInterface.length > 0)
        msg += ` | http://${netInterface[0]}:${port}`
    
    console.log(msg)
})
