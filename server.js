const routes = require("./routes")
const mongo = require("mongodb")
const modelFuncs = require("./models/myapp")
const path = require("path")
const express = require("express")
const app = express()

require("dotenv").config();

// middleware
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")))
}

app.use(cookieParser());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))