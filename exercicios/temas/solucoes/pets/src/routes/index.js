const express = require("express")
const router = express.Router()

router.get("/", function (req, res) {
    res.status(200).send({
        title: "Reprograma - On7 Semana 11 - Projeto Revisão",
        version: "1.0.0"
    })
})

module.exports = router