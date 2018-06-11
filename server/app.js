// server/app.js

/** require dependencies */
const express = require("express")
const routes = require('./routes/')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cloudinary = require('cloudinary')

const morgan      = require('morgan');
const jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('./config'); // get our config file


const app = express()
const router = express.Router()
//const url = process.env.MONGODB_URI || "mongodb://localhost:27017/medium"
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/examRegistration"
const authentication=require("./routes/authentication")
const tokenVerifiers=require("./tokenVerifier")

/** configure cloudinary */
cloudinary.config({
    cloud_name: 'YOUR_CLOUDINARY_NAME_HERE',
    api_key: 'YOUR_CLOUDINARY_API_KEY_HERE',
    api_secret: 'YOUR_CLOUDINARY_API_SECRET_HERE'
})

/** connect to MongoDB datastore */
try {
    mongoose.connect(url, {
        //useMongoClient: true
    })    
} catch (error) {
    
}

let port = 5000 || process.env.PORT

/** set up routes {API Endpoints} */
authentication(router)
tokenVerifiers(router)
//routes(router)


/** set up middlewares */
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(helmet())
//app.use('/static',express.static(path.join(__dirname,'static')))

app.use('/api', router)
app.use(morgan('dev'));
app.set('superSecret', config.secret); // secret variable
/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});