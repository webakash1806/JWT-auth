const express = require("express")
require('dotenv').config()
const bodyParser = require("body-parser")
const dbConfig = require("./config/db.config")
const userRoute = require("./router/user.routes")
const cookieParser = require("cookie-parser")
const port = process.env.PORT || 3000

const app = express()

app.use(bodyParser.json())
app.use(cookieParser())

app.use("/", userRoute)

dbConfig()

app.listen(port, () => {
    console.log("Server is running at port no:" + port)
})
