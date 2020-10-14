const routes = require("./routes")
const mongo = require("mongodb")
const modelFuncs = require("./models/myapp")
const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const app = express()

require("dotenv").config();

// middleware
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")))
}

app.use(cookieParser());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const uri = process.env.MONGODB_URI
const myClient = new mongo.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

//connect to mongo client to perform operations
myClient.connect((err, db) => {
    if (err) {
        throw err
    }

    console.log("Connected to DB")
    //link up to bakerInn_db
    let myAppDB = db.db("myapp")
    let modelFuncsObj = modelFuncs(myAppDB)

    // set up routes
    routes(app, { modelFuncsObj })

})


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
})

//close db connection when app is closed.
let onClose = function () {
    server.close(() => {
        console.log('Process terminated')
        myClient.close(() => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);