const express = require("express")
require('dotenv').config()
const bodyParser = require("body-parser")
const dbConfig = require("./config/db.config")
const userRoute = require("./router/user.routes")
// const { default: mongoose } = require("mongoose")

const app = express()
app.use(bodyParser.json())

app.use("/", userRoute)

// mongoose.connect(dbConfig.db_url)
// const db = mongoose.connection

// db.on("conn", () => {
//     console.log("Connection Successfull")
// })

app.listen(3000, () => {
    console.log("Server is running at port 3000")
})
