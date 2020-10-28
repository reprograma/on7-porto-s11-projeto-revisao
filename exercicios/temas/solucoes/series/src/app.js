const express = require("express")
const app = express()

//rotas
const index = require("./routes/index")
const series = require("./routes/series")

app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

app.use("/", index)
app.use("/series", series)

module.exports = app